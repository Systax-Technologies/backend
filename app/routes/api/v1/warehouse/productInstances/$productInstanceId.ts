import type { ProductInstance } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { findProductInstance } from "~/models/productInstance/productInstance.server";

type LoaderData = ProductInstance;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productInstanceId = params.productInstanceId;

  if (productInstanceId == null) {
    throw badRequest();
  }

  const productInstance = await findProductInstance(productInstanceId);

  if (productInstance == null) {
    throw notFoundRequest();
  }

  return productInstance;
};
