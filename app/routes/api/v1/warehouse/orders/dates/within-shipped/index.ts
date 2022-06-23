import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import { findOrdersWithinShippedDates } from "~/models/order/order.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() != "post") {
    throw new Response(null, {
      status: 405,
      statusText: "Invalid Method",
    });
  }

  const schema = z.object({
    startDate: z.nullable(z.date()),
    endDate: z.nullable(z.date()),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;

    if (!data.startDate) {
      data.startDate = new Date("1970-01-01");
    }

    if (!data.endDate) {
      data.endDate = new Date();
    }

    const ordersWithinDates = await findOrdersWithinShippedDates(
      data.startDate,
      data.endDate
    );

    if (!ordersWithinDates || !ordersWithinDates.length) {
      throw new Response(null, {
        status: 404,
        statusText: "Order(s) Not Found",
      });
    }
    throw new Response(JSON.stringify({ ordersWithinDates }), {
      status: 200,
      statusText: "OK",
    });
  }
};
