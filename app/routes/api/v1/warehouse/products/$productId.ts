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
import {
  deleteProduct,
  findProduct,
  updateProduct,
} from "~/models/product/product.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  verifyRequest<"customer">(request);

  const productId = params.productId;

  if (!productId) {
    throw badRequestResponse();
  }

  const product = await findProduct(productId);

  if (!product) {
    throw notFoundResponse();
  }

  return okResponse(JSON.stringify(product));
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const method = request.method.toLowerCase();
  if (method === "patch" || method === "delete") {
    const jwtContent = verifyRequest<"employee">(request);
    if (jwtContent.role !== "ADMIN") {
      throw forbiddenResponse();
    }

    const productId = params.productId;

    if (productId == null) {
      return badRequestResponse();
    }

    if (method === "patch") {
      const patchSchema = z.object({
        model: z.string(),
        imageUrl: z.string().array(),
        description: z.string(),
        color: z.string(),
        size: z.string(),
        price: z.number().positive(),
      });

      const data = await parseBody(request, patchSchema);
      const product = await updateProduct(productId, data);

      if (product == null) {
        return notFoundResponse();
      }

      return okResponse(JSON.stringify(product));
    } else {
      const product = await deleteProduct(productId);

      if (product == null) {
        return notFoundResponse();
      }

      return okResponse(JSON.stringify(product));
    }
  } else {
    return methodNotAllowedResponse();
  }
};
