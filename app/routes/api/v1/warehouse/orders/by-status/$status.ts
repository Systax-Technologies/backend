import type { Order } from "@prisma/client";
import { OrderStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { findOrdersByStatus } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
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

    return orders;
  } else {
    throw badRequestResponse();
  }
};
