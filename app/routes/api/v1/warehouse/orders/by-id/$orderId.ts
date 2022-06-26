import { Order, OrderStatus } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequest,
  methodNotAllowed,
  notFoundRequest,
} from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import {
  deleteOrder,
  findOrderById,
  updateOrder,
} from "~/models/order/order.server";

type LoaderData = Order;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const orderId = params.orderId;

  if (!orderId) {
    badRequest();
  }

  const order = await findOrderById(orderId);

  if (!order) {
    notFoundRequest();
  }

  return order;
};

export const action: ActionFunction = async ({ request, params }) => {
  const orderId = params.orderId;

  if (!orderId) {
    badRequest();
  }

  switch (request.method.toLowerCase()) {
    case "patch": {
      handlePATCHRequest(orderId, request);
    }

    case "delete": {
      handleDELETERequest(orderId);
    }

    default: {
      methodNotAllowed();
    }
  }
};

const handlePATCHRequest = async (id: string, request: Request) => {
  const schema = z.object({
    status: z.nativeEnum(OrderStatus),
    shippedAt: z.nullable(z.date()),
    deliveredAt: z.nullable(z.date()),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const updatedOrder = await updateOrder(id, {
      status: data.status,
      shippedAt: data.shippedAt,
      deliveredAt: data.deliveredAt,
    });
    return new Response(JSON.stringify(updatedOrder), {
      status: 200,
      statusText: "OK",
    });
  } else {
    badRequest();
  }
};

const handleDELETERequest = async (id: string) => {
  const deletedOrder = await deleteOrder(id);

  if (!deletedOrder) {
    badRequest();
  }
  return new Response(JSON.stringify(deletedOrder), {
    status: 200,
    statusText: "OK",
  });
};
