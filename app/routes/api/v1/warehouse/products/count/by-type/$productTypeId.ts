import type { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { countProductInstancesByType } from "~/models/productInstance/productInstance.server";

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

  const countedProducts = await countProductInstancesByType(productTypeId);

  if (countedProducts == null) {
    throw notFoundRequest();
  }

  return { numberOfProducts: countedProducts };
};
