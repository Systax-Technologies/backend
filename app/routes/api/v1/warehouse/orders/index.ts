import type { Order } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { forbiddenResponse } from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findOrders } from "~/models/order/order.server";

type LoaderData = { orders: Order[] };

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN" || "WORKER") {
    throw forbiddenResponse();
  }
  const orders = await findOrders();
  return {
    orders,
  };
};
