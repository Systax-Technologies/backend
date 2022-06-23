import { Order, OrderStatus } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import {
  createOrder,
  deleteOrder,
  findOrders,
  updateOrder,
} from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return await findOrders();
};

export const action: ActionFunction = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "post":
      postRequest(request);
      break;
    case "patch":
      patchRequest(request);
      break;
    case "delete":
      deleteRequest(request);
      break;

    default: {
      throw new Response(null, {
        status: 405,
        statusText: "Invalid Method",
      });
    }
  }
};

const postRequest = async (request: Request) => {
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

const patchRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(OrderStatus),
    orderedAt: z.date(),
    shippedAt: z.nullable(z.date()),
    deliveredAt: z.nullable(z.date()),
    customerId: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const updatedOrder = await updateOrder(data.id, {
      status: data.status,
      orderedAt: data.orderedAt,
      shippedAt: data.shippedAt,
      deliveredAt: data.deliveredAt,
      customerId: data.customerId,
    });
    throw new Response(JSON.stringify(updateOrder), {
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

const deleteRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const deletedOrder = await deleteOrder(data.id);
    throw new Response(JSON.stringify(deletedOrder), {
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
