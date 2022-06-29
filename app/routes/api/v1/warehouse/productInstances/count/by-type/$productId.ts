import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { countProductInstancesByType } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProductInstances: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productId = params.productId;

  if (productId == null) {
    throw badRequestResponse();
  }

  const countedProductInstances = await countProductInstancesByType(productId);

  if (countedProductInstances == null) {
    throw notFoundResponse();
  }

  return { numberOfProductInstances: countedProductInstances };
};
