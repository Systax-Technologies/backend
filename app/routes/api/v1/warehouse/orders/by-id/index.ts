import { OrderStatus } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "~/models/order/order.server";

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post": {
      return handlePOSTRequest(request);
    }

    case "patch": {
      return handlePATCHRequest(request);
    }

    case "delete": {
      return handleDELETERequest(request);
    }

    default: {
      return methodNotAllowedResponse();
    }
  }
};

const handlePOSTRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    customerId: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);
  const createdOrder = await createOrder(parsedData);

  if (!createdOrder) {
    return badRequestResponse();
  }

  return okResponse(JSON.stringify(createdOrder));
};

const handlePATCHRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(OrderStatus),
    shippedAt: z.preprocess(
      (a) => (a == null ? null : new Date(z.string().parse(a))),
      z.nullable(z.date()),
    ),
    deliveredAt: z.preprocess(
      (a) => (a == null ? null : new Date(z.string().parse(a))),
      z.nullable(z.date()),
    ),
  });

  const parsedData = await parseBody(request, schema);

  const updatedOrder = await updateOrder(parsedData.id, {
    status: parsedData.status,
    shippedAt: parsedData.shippedAt,
    deliveredAt: parsedData.deliveredAt,
  });
  return okResponse(JSON.stringify(updatedOrder));
};

const handleDELETERequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  const deletedOrder = await deleteOrder(parsedData.id);

  if (deletedOrder == null) {
    return badRequestResponse();
  }
  return okResponse(JSON.stringify(deletedOrder));
};
