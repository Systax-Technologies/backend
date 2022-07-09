import { OrderStatus } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  forbiddenResponse,
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { deleteOrder, updateOrder } from "~/models/order/order.server";

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
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

const handlePATCHRequest = async (request: Request): Promise<Response> => {
  const jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN" || "WORKER") {
    throw forbiddenResponse();
  }
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(OrderStatus),
    shippedAt: z.preprocess((arg) => {
      if (typeof arg === "string") {
        return new Date(arg);
      }
    }, z.date()),
    deliveredAt: z.preprocess((arg) => {
      if (typeof arg === "string") {
        return new Date(arg);
      }
    }, z.date()),
  });

  const parsedData = await parseBody(request, schema);

  const updatedOrder = await updateOrder(parsedData.id, {
    status: parsedData.status,
    shippedAt: parsedData.shippedAt,
    deliveredAt: parsedData.deliveredAt,
  });

  if (updatedOrder == null) {
    throw notFoundResponse();
  }

  return okResponse(JSON.stringify(updatedOrder));
};

const handleDELETERequest = async (request: Request): Promise<Response> => {
  await verifyEmployeeRequest(request);

  const schema = z.object({
    id: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  const deletedOrder = await deleteOrder(parsedData.id);

  if (deletedOrder == null) {
    return notFoundResponse();
  }
  return okResponse(JSON.stringify(deletedOrder));
};
