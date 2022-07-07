import type { Product } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";

import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
import {
  deleteProduct,
  findProduct,
  updateProduct,
} from "~/models/product/product.server";

type LoaderData = Product;

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  verifyRequest<"customer">(request);

  const productId = params.productId;

  if (!productId) {
    throw badRequestResponse();
  }

  const product = await findProduct(productId);

  if (!product) {
    throw notFoundResponse();
  }

  return product;
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const productId = params.productId;

  if (productId == null) {
    return badRequestResponse();
  }

  let jwtContent = verifyRequest<"employee">(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }

  switch (request.method.toLowerCase()) {
    case "patch":
      return handlePATCHRequest(productId, request);

    case "delete":
      return handleDELETERequest(productId);

    default:
      return methodNotAllowedResponse();
  }
};

const handlePATCHRequest = async (
  id: string,
  request: Request
): Promise<Response> => {
  const patchSchema = z.object({
    model: z.string(),
    imageUrl: z.string(),
    description: z.string(),
    color: z.string(),
    size: z.string(),
    price: z.number().positive(),
  });

  const data = await parseBody(request, patchSchema);
  const product = await updateProduct(id, data);

  if (product == null) {
    return notFoundResponse();
  }

  return okResponse(JSON.stringify(product));
};

const handleDELETERequest = async (id: string) => {
  const product = await deleteProduct(id);

  if (product == null) {
    return notFoundResponse();
  }

  return okResponse(JSON.stringify(product));
};
function forbiddenResponse() {
  throw new Error("Function not implemented.");
}
