import type { Order } from "@prisma/client";
import { OrderStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findOrdersByStatus } from "~/models/order/order.server";

type LoaderData = { orders: Order[] };

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN" || "WORKER") {
    throw forbiddenResponse();
  }

  let orderStatus = params.status;
  if (!orderStatus) {
    throw badRequestResponse();
  }

  orderStatus = orderStatus.toUpperCase();

  const schema = z.nativeEnum(OrderStatus);

  const parsedData = schema.safeParse(orderStatus);

  if (parsedData.success) {
    const orders = await findOrdersByStatus(parsedData.data);

    if (!orders || !orders.length) {
      throw notFoundResponse();
    }

    return { orders };
  } else {
    throw badRequestResponse();
  }
};
