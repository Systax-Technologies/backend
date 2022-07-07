import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  forbiddenResponse,
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
import { createProduct, findProducts } from "~/models/product/product.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  verifyRequest<"employee">(request);

  const products = await findProducts();
  return okResponse(JSON.stringify({ products }));
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post": {
      const jwtContent = verifyRequest<"employee">(request);
      if (jwtContent.role !== "ADMIN") {
        throw forbiddenResponse();
      }

      const productPostSchema = z.object({
        model: z.string(),
        imageUrl: z.string().array(),
        description: z.string(),
        color: z.string(),
        size: z.string(),
        price: z.number().positive(),
      });

      const data = await parseBody(request, productPostSchema);

      const createdProduct = await createProduct(data);

      return okResponse(JSON.stringify(createdProduct));
    }
    default: {
      return methodNotAllowedResponse();
    }
  }
};
