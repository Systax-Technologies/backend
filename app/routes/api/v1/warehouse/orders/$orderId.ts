import type { Order } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { findOrderById } from "~/models/order/order.server";

type LoaderData = Order;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const orderId = params.orderId;

  if (!orderId) {
    throw badRequestResponse();
  }

  const order = await findOrderById(orderId);

  if (!order) {
    throw notFoundResponse();
  }

  return order;
};
