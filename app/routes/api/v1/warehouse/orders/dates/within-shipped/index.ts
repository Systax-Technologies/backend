import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  methodNotAllowed,
  notFoundRequest,
} from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { findOrdersWithinShippedDates } from "~/models/order/order.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() != "post") {
    methodNotAllowed();
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

  const ordersWithinDates = await findOrdersWithinShippedDates(
    parsedData.startDate,
    parsedData.endDate
  );

  if (!ordersWithinDates || !ordersWithinDates.length) {
    throw notFoundRequest();
  }

  return new Response(JSON.stringify({ ordersWithinDates }), {
    status: 200,
    statusText: "OK",
  });
};
