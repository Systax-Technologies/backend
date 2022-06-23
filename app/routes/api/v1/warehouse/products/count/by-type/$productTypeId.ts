import { LoaderFunction } from "@remix-run/node";
import { countProductByType } from "~/models/product/product.server";

type LoaderData = number;

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

  const countedPoducts = await countProductByType(productTypeId);

  if (countedPoducts == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Product Type Not Found",
    });
  }

  return countedPoducts;
};