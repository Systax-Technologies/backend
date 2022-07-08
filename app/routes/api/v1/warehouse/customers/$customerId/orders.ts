import type { Order } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findCustomerOrders } from "~/models/order/order.server";

type LoaderData = { orders: Order[] };

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const customerId = params.customerId;

  if (!customerId) {
    throw badRequestResponse();
  }

  await verifyEmployeeRequest(request);

  const orders = await findCustomerOrders(customerId);

  if (!orders || !orders.length) {
    throw notFoundResponse();
  }

  return { orders };
};
