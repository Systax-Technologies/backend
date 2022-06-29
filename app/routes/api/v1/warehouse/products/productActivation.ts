import { Product } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import { productInstanceActivation } from "~/models/productInstance/productInstance.server";

export const action: ActionFunction = async ({ request }): Promise<Product> => {
  if (request.method.toLowerCase() != "post") {
    throw new Response(null, {
      status: 405,
      statusText: "Invalid Method",
    });
  }
  const schema = z.object({
    customerId: z.string().cuid(),
    productId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const productActivated = await productInstanceActivation(
    data.customerId,
    data.productId,
  );
  return productActivated;
};
