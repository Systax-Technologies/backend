import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  methodNotAllowed,
  notFoundRequest,
} from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { findOrdersWithinOrderedDates } from "~/models/order/order.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() != "post") {
    methodNotAllowed();
  }

  const schema = z.object({
    startDate: z.nullable(z.date()),
    endDate: z.nullable(z.date()),
  });

  const parsedData = await parseBody(request, schema);

  if (!parsedData.startDate) {
    parsedData.startDate = new Date("1970-01-01");
  }
  if (!parsedData.endDate) {
    parsedData.endDate = new Date();
  }
  const ordersWithinDates = await findOrdersWithinOrderedDates(
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
