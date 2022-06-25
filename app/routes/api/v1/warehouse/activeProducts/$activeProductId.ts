import { ActiveProduct } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { findActiveProduct } from "~/models/activeProduct/activeProduct.server";

type LoaderData = ActiveProduct;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const activeProductId = params.productId;

  if (activeProductId == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Product Id Not Provided",
    });
  }

  const activeProduct = await findActiveProduct(activeProductId);

  if (activeProduct == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Product Not Found",
    });
  }

  return activeProduct;
};
