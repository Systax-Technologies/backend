import type { ProductInstance } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { findProductInstance } from "~/models/productInstance/productInstance.server";

type LoaderData = ProductInstance;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productInstanceId = params.productInstanceId;

  if (productInstanceId == null) {
    throw badRequestResponse();
  }

  const productInstance = await findProductInstance(productInstanceId);

  if (productInstance == null) {
    throw notFoundResponse();
  }

  return productInstance;
};
