<<<<<<< Updated upstream
import { Product } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
=======
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
>>>>>>> Stashed changes
import { z } from "zod";
import {
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { createProduct, findProducts } from "~/models/product/product.server";

<<<<<<< Updated upstream
type LoaderData = { products: Product[] };

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const products = await findProducts();
  return {
    products,
  };
=======
export const loader: LoaderFunction = async ({}): Promise<Response> => {
  const products = await findProducts();
  return json({ products });
>>>>>>> Stashed changes
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post": {
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
    imageUrl: z.string().array(),
    description: z.string(),
    color: z.string(),
    size: z.string(),
    price: z.number().positive(),
  });

  const data = await parseBody(request, productPostSchema);

  return okResponse(JSON.stringify(await createProduct(data)));
};
