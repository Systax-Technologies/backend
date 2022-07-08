import type { ProductInstance } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findProductInstance } from "~/models/productInstance/productInstance.server";

type LoaderData = ProductInstance;

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  await verifyEmployeeRequest(request);

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
