import { Order } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { findOrders } from "~/models/order/order.server";

type LoaderData = { orders: Order[] };

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const orders = await findOrders();
  return {
    orders,
  };
};
