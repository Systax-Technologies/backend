import { OrderStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "~/models/order/order.server";

export const loader: LoaderFunction = async () => {
  throw badRequestResponse();
};

export const action: ActionFunction = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "post": {
      throw handlePOSTRequest(request);
    }

    case "patch": {
      throw handlePATCHRequest(request);
    }

    case "delete": {
      throw handleDELETERequest(request);
    }

    default: {
      throw methodNotAllowedResponse();
    }
  }
};

const handlePOSTRequest = async (request: Request) => {
  const schema = z.object({
    customerId: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  const createdOrder = await createOrder(parsedData);

  if (!createdOrder) {
    throw badRequestResponse();
  }

  return new Response(JSON.stringify(createdOrder), {
    status: 200,
    statusText: "OK",
  });
};

const handlePATCHRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(OrderStatus),
    shippedAt: z.preprocess(
      (a) => (a == null ? null : new Date(z.string().parse(a))),
      z.nullable(z.date())
    ),
    deliveredAt: z.preprocess(
      (a) => (a == null ? null : new Date(z.string().parse(a))),
      z.nullable(z.date())
    ),
  });

  const parsedData = await parseBody(request, schema);

  const updatedOrder = await updateOrder(parsedData.id, {
    status: parsedData.status,
    shippedAt: parsedData.shippedAt,
    deliveredAt: parsedData.deliveredAt,
  });
  return new Response(JSON.stringify(updatedOrder), {
    status: 200,
    statusText: "OK",
  });
};

const handleDELETERequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  const deletedOrder = await deleteOrder(parsedData.id);

  if (deletedOrder == null) {
    throw badRequestResponse();
  }
  return new Response(JSON.stringify(deletedOrder), {
    status: 200,
    statusText: "OK",
  });
};
