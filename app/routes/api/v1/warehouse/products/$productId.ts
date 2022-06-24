import type { Product } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findProduct } from "~/models/product/product.server";

type LoaderData = Product;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productId = params.productId;

  if (productId == null) {
    return badRequest();
  }

  const product = await findProduct(productId);

  if (product == null) {
    return notFoundRequest();
  }

  return product;
};
