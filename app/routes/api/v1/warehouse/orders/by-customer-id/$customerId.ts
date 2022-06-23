import { Order } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { findOrdersByCustomer } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const customerId = params.customerId;

  if (!customerId) {
    throw new Response(null, {
      status: 400,
      statusText: "Customer Id Not Provided",
    });
  }

  const orders = await findOrdersByCustomer(customerId);

  if (!orders || !orders.length) {
    throw new Response(null, {
      status: 404,
      statusText: "Order(s) Not Found",
    });
  }

  return orders;
};
