import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { countProductInstancesByType } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProductInstances: number;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  let jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }

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
