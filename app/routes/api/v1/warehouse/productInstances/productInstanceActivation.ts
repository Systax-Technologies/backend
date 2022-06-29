import { ProductInstance } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { notFoundRequest } from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { productInstanceActivation } from "~/models/productInstance/productInstance.server";

export const action: ActionFunction = async ({
  request,
}): Promise<ProductInstance> => {
  if (request.method.toLowerCase() != "post") {
    throw new Response(null, {
      status: 405,
      statusText: "Invalid Method",
    });
  }
  const schema = z.object({
    customerId: z.string().cuid(),
    productInstanceId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const productInstanceActivated = await productInstanceActivation(
    data.customerId,
    data.productInstanceId
  );

  if (productInstanceActivated == null) {
    throw notFoundRequest();
  }

  return productInstanceActivated;
};
