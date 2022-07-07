import { ProductInstanceStatus } from "@prisma/client";
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
import { verifyRequest } from "~/lib/verify-request.server";
import type { ProductInstances } from "~/models/productInstance/productInstance.server";
import {
  createManyProductInstances,
  deleteProductInstance,
  findManyProductInstances,
  updateProductInstance,
} from "~/models/productInstance/productInstance.server";

type LoaderData = {
  productInstances: ProductInstances;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  verifyRequest<"employee">(request);
  const productInstances = await findManyProductInstances();
  return {
    productInstances,
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const map: Record<string, (request: Request) => Promise<Response>> = {
    post: postRequest,
    patch: patchRequest,
    delete: deleteRequest,
  };

  const method = request.method.toLowerCase();

  if (method in map) {
    let jwtContent = verifyRequest<"employee">(request);
    if (method !== "patch") {
      if (jwtContent.role !== "ADMIN") {
        throw forbiddenResponse();
      }
    }
    return map[method](request);
  }

  return badRequestResponse();
};

const postRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    productId: z.string().cuid(),
    quantity: z.number().min(1),
  });

  const data = await parseBody(request, schema);

  const createdProductInstances = await createManyProductInstances(
    data.productId,
    data.quantity
  );

  return okResponse(
    JSON.stringify({ numberOfCreatedProducts: createdProductInstances })
  );
};

const patchRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(ProductInstanceStatus),
    orderId: z.nullable(z.string().cuid()),
    productId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);

  const updatedProductInstance = await updateProductInstance(data.id, {
    status: data.status,
    orderId: data.orderId,
    productId: data.productId,
  });

  if (!updatedProductInstance) {
    return notFoundResponse();
  }

  return okResponse(JSON.stringify(updatedProductInstance));
};

const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const deletedProductInstance = await deleteProductInstance(data.id);

  if (deletedProductInstance == null) {
    return notFoundResponse();
  }

  throw okResponse(JSON.stringify(deletedProductInstance));
};
