import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { methodNotAllowedResponse } from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { createProduct } from "~/models/product/product.server";

export const action: ActionFunction = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "post": {
      throw handlePOSTRequest(request);
    }
    default: {
      methodNotAllowedResponse();
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
    price: z.number(),
  });

  const data = await parseBody(request, productPostSchema);

  return createProduct(data);
};
