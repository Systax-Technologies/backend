import { Order } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { methodNotAllowed } from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { createOrder, findOrders } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return await findOrders();
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() == "post") {
    handlePOSTRequest(request);
  } else {
    methodNotAllowed();
  }
};

const handlePOSTRequest = async (request: Request) => {
  const schema = z.object({
    customerId: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const createdOrder = await createOrder(data.customerId);
    throw new Response(JSON.stringify({ createdOrder }), {
      status: 200,
      statusText: "OK",
    });
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};
