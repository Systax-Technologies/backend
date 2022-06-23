import { Order, OrderStatus } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { findOrdersByStatus } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  let orderStatus = params.status;
  if (!orderStatus) {
    throw new Response(null, {
      status: 400,
      statusText: "Status Not Provided",
    });
  }

  orderStatus = orderStatus.toUpperCase();

  const keys = Object.keys(OrderStatus).filter((v) => isNaN(Number(v)));

  let orders;

  if (keys.includes(orderStatus)) {
    orders = await findOrdersByStatus(orderStatus as unknown as OrderStatus);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Non Existing Status Provided",
    });
  }

  if (!orders || !orders.length) {
    throw new Response(null, {
      status: 404,
      statusText: "Order(s) Not Found",
    });
  }

  return orders;
};
