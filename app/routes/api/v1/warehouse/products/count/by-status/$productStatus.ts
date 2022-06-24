import { ProductStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { countProductByStatus } from "~/models/product/product.server";

type LoaderData = {
  numberOfProducts: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productStatus = params.productStatus;

  if (productStatus == null) {
    badRequest();
  }

  const schema = z.nativeEnum(ProductStatus);
  const parsedData = schema.safeParse(productStatus);
  if (parsedData.success) {
    const countedProductsStatus = await countProductByStatus(parsedData.data);

    if (countedProductsStatus == null) {
      throw notFoundRequest();
    }

    return { numberOfProducts: countedProductsStatus };
  } else {
    throw badRequest();
  }
};
