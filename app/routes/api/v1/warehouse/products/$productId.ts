import type { Product } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";

import { parseBody } from "~/lib/parse-body.server";
import {
  deleteProduct,
  findProduct,
  updateProduct,
} from "~/models/product/product.server";

type LoaderData = Product;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
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

export const action: ActionFunction = async ({ request, params }) => {
  const productId = params.productId;

  if (productId == null) {
    throw badRequestResponse();
  }

  switch (request.method.toLowerCase()) {
    case "patch": {
      handlePATCHRequest(productId, request);
    }

    case "delete": {
      handleDELETERequest(productId);
    }

    default: {
      methodNotAllowedResponse();
    }
  }
};

const handlePATCHRequest = async (id: string, request: Request) => {
  const patchSchema = z.object({
    model: z.string(),
    imageUrl: z.string(),
    description: z.string(),
    color: z.string(),
    size: z.string(),
    price: z.number(),
  });

  const data = await parseBody(request, patchSchema);

  const product = await updateProduct(id, data);

  if (product == null) {
    throw notFoundResponse();
  }

  throw new Response(JSON.stringify(product), {
    status: 200,
    statusText: "OK",
  });
};

const handleDELETERequest = async (id: string) => {
  const product = await deleteProduct(id);

  if (product == null) {
    throw notFoundResponse();
  }

  throw new Response(JSON.stringify(product), {
    status: 200,
    statusText: "200",
  });
};
