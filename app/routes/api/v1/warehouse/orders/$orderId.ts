import type { Order } from "@prisma/client";
import { OrderStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
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
import {
  deleteOrder,
  findOrderById,
  updateOrder,
} from "~/models/order/order.server";

type LoaderData = { order: Order };

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  await verifyEmployeeRequest(request);
  const orderId = params.orderId;

  if (!orderId) {
    throw badRequestResponse();
  }

  const order = await findOrderById(orderId);

  if (!order) {
    throw notFoundResponse();
  }

  return { order };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const orderId = params.orderId;

  if (!orderId) {
    throw badRequestResponse();
  }

  switch (request.method.toLowerCase()) {
    case "patch": {
      return handlePATCHRequest(request, orderId);
    }

    case "delete": {
      return handleDELETERequest(request, orderId);
    }

    default: {
      return methodNotAllowedResponse();
    }
  }
};

const handlePATCHRequest = async (
  request: Request,
  orderId: string,
): Promise<Response> => {
  const jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN" || "WORKER") {
    throw forbiddenResponse();
  }

  const schema = z.object({
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

  const updatedOrder = await updateOrder(orderId, {
    status: parsedData.status,
    shippedAt: parsedData.shippedAt,
    deliveredAt: parsedData.deliveredAt,
  });

  if (updatedOrder == null) {
    throw notFoundResponse();
  }

  return okResponse(JSON.stringify(updatedOrder));
};

const handleDELETERequest = async (
  request: Request,
  orderId: string,
): Promise<Response> => {
  await verifyEmployeeRequest(request);

  const deletedOrder = await deleteOrder(orderId);

  if (deletedOrder == null) {
    return notFoundResponse();
  }
  return okResponse(JSON.stringify(deletedOrder));
};
