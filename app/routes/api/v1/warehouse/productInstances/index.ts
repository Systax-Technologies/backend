import { ProductInstanceStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { ProductInstances } from "~/models/dto";
import {
  createManyProductInstances,
  deleteProductInstance,
  findManyProductInstances,
  updateProductInstance,
} from "~/models/productInstance/productInstance.server";

type LoaderData = {
  productInstances: ProductInstances;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const productInstances = await findManyProductInstances();
  return {
    productInstances,
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post":
      return postRequest(request);

    case "patch":
      return patchRequest(request);

    case "delete":
      return deleteRequest(request);

    default: {
      return methodNotAllowedResponse();
    }
  }
};

const postRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().positive(),
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
