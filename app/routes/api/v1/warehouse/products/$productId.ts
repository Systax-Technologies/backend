import type { Product } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findProductInstance } from "~/models/productInstance/productInstance.server";

type LoaderData = Product;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productId = params.productId;

  if (productId == null) {
    throw badRequest();
  }

  const product = await findProductInstance(productId);

  if (product == null) {
    throw notFoundRequest();
  }

  return product;
};
