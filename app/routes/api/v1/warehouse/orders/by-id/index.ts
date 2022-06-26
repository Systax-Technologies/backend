import { OrderStatus } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { badRequest, methodNotAllowed } from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "~/models/order/order.server";

export const loader: LoaderFunction = async () => {
  throw badRequest();
};

export const action: ActionFunction = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "post": {
      await handlePOSTRequest(request);
    }

    case "patch": {
      await handlePATCHRequest(request);
    }

    case "delete": {
      await handleDELETERequest(request);
    }

    default: {
      throw methodNotAllowed();
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
    throw badRequest();
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
    shippedAt: z.nullable(z.date()),
    deliveredAt: z.nullable(z.date()),
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
    throw badRequest();
  }
  return new Response(JSON.stringify(deletedOrder), {
    status: 200,
    statusText: "OK",
  });
};
