import { Order } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findOrderById } from "~/models/order/order.server";

type LoaderData = Order;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const orderId = params.orderId;

  if (!orderId) {
    throw badRequest();
  }

  const order = await findOrderById(orderId);

  if (!order) {
    throw notFoundRequest();
  }

  return order;
};
