import { Order, OrderStatus } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findOrdersByStatus } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  let orderStatus = params.status;
  if (!orderStatus) {
    throw badRequest();
  }

  orderStatus = orderStatus.toUpperCase();

  const schema = z.nativeEnum(OrderStatus);

  const parsedData = schema.safeParse(orderStatus);

  if (parsedData.success) {
    const orders = await findOrdersByStatus(parsedData.data);

    if (!orders || !orders.length) {
      throw notFoundRequest();
    }

    return orders;
  } else {
    throw badRequest();
  }
};
