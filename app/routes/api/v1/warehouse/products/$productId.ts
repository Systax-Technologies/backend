import type { Product } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { findProduct } from "~/models/product/product.server";

type LoaderData = Product;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productId = params.productId;

  if (productId == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Product Id Not Provided",
    });
  }

  const product = await findProduct(productId);

  if (product == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Product Not Found",
    });
  }

  return product;
};
