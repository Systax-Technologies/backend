import { Order } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { findOrderById } from "~/models/order/order.server";

type LoaderData = Order;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const orderId = params.orderId;

  if (!orderId) {
    throw new Response(null, {
      status: 400,
      statusText: "Order Id Not Provided",
    });
  }

  const order = await findOrderById(orderId);

  if (!order) {
    throw new Response(null, {
      status: 404,
      statusText: "Order Not Found",
    });
  }

  return order;
};
