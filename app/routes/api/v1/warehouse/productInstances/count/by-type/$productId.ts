import type { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { countProductInstancesByType } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProductInstances: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productId = params.productId;

  if (productId == null) {
    throw badRequest();
  }

  const countedProductInstances = await countProductInstancesByType(productId);

  if (countedProductInstances == null) {
    throw notFoundRequest();
  }

  return { numberOfProductInstances: countedProductInstances };
};
