import { Product } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import { productActivation } from "~/models/product/product.server";

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

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const productActivated = await productActivation(
      data.customerId,
      data.productId
    );
    return productActivated;
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};
