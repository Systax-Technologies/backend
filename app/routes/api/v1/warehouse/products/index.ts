import type { Product } from "@prisma/client";
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

type LoaderData = { products: Product[] };

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  verifyRequest<"customer">(request);

  const products = await findProducts();
  return {
    products,
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post": {
      let jwtContent = verifyRequest<"employee">(request);
      if (jwtContent.role !== "ADMIN" || "WORKER") {
        throw forbiddenResponse();
      }
      return handlePOSTRequest(request);
    }
    default: {
      return methodNotAllowedResponse();
    }
  }
};

const handlePOSTRequest = async (request: Request) => {
  const productPostSchema = z.object({
    model: z.string(),
    imageUrl: z.string(),
    description: z.string(),
    color: z.string(),
    size: z.string(),
    price: z.number().positive(),
  });

  const data = await parseBody(request, productPostSchema);

  return okResponse(JSON.stringify(createProduct(data)));
};
