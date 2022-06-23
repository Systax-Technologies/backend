import { LoaderFunction } from "@remix-run/node";
import { countProductByType } from "~/models/product/product.server";

type LoaderData = string;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productTypeId = params.productTypeId;

  if (productTypeId == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Product Type Not Provided",
    });
  }

  const countedProducts = await countProductByType(productTypeId);

  if (countedProducts == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Product Type Not Found",
    });
  }

  return JSON.stringify({numberOfProducts: countedProducts});
};
