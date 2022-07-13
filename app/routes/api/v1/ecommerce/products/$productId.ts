import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";

import { findProduct } from "~/models/product/product.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const productId = params.productId;

  if (!productId) {
    throw badRequestResponse();
  }

  const product = await findProduct(productId);

  if (!product) {
    throw notFoundResponse();
  }

  return okResponse(JSON.stringify(product));
};
