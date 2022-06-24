import type { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { countProductByType } from "~/models/product/product.server";

type LoaderData = {
  numberOfProducts: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productTypeId = params.productTypeId;

  if (productTypeId == null) {
    throw badRequest();
  }

  const countedProducts = await countProductByType(productTypeId);

  if (countedProducts == null) {
    throw notFoundRequest();
  }

  return { numberOfProducts: countedProducts };
};
