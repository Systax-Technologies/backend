import type { Order } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  forbiddenResponse,
  methodNotAllowedResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findOrdersWithinDeliveredDates } from "~/models/order/order.server";

type LoaderData = {
  orders: Order[];
};

export const action: ActionFunction = async ({
  request,
}): Promise<LoaderData> => {
  if (request.method.toLowerCase() != "post") {
    throw methodNotAllowedResponse();
  }
  const jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN" || "WORKER") {
    throw forbiddenResponse();
  }

  const schema = z.object({
    startDate: z.preprocess((arg) => {
      if (typeof arg === "string") {
        return new Date(arg);
      }
    }, z.date()),
    endDate: z.preprocess((arg) => {
      if (typeof arg === "string") {
        return new Date(arg);
      }
    }, z.date()),
  });

  const parsedData = await parseBody(request, schema);

  const ordersWithinDates = await findOrdersWithinDeliveredDates(
    parsedData.startDate,
    parsedData.endDate,
  );

  if (!ordersWithinDates || !ordersWithinDates.length) {
    throw notFoundResponse();
  }

  return { orders: ordersWithinDates };
};
