import { Order } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findCustomerOrders } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const customerId = params.customerId;

  if (!customerId) {
    badRequest();
  }

  const orders = await findCustomerOrders(customerId);

  if (!orders || !orders.length) {
    notFoundRequest();
  }

  return orders;
};
