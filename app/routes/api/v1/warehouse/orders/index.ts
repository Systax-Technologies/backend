import { Order } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { findOrders } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return await findOrders();
};
