import { Order, OrderStatus } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findOrdersByStatus } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  let orderStatus = params.status;
  if (!orderStatus) {
    badRequest();
  }

  orderStatus = orderStatus.toUpperCase();

  const keys = Object.keys(OrderStatus).filter((v) => isNaN(Number(v)));

  let orders;

  if (keys.includes(orderStatus)) {
    orders = await findOrdersByStatus(orderStatus as unknown as OrderStatus);
  } else {
    badRequest();
  }

  if (!orders || !orders.length) {
    notFoundRequest();
  }

  return orders;
};
