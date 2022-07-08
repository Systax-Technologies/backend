import type { Order } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findOrderById } from "~/models/order/order.server";

type LoaderData = { order: Order };

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  await verifyEmployeeRequest(request);
  const orderId = params.orderId;

  if (!orderId) {
    throw badRequestResponse();
  }

  const order = await findOrderById(orderId);

  if (!order) {
    throw notFoundResponse();
  }

  return { order };
};
