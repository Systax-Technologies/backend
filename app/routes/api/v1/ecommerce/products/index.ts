import type { LoaderFunction } from "@remix-run/node";
import { okResponse } from "~/helpers/response-helpers.server";
import { findProducts } from "~/models/product/product.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const products = await findProducts();
  return okResponse(JSON.stringify({ products }));
};
