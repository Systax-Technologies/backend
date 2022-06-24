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
    return badRequest();
  }

  const schema = z.nativeEnum(ProductStatus);
  const parsedData = schema.safeParse(productStatus);
  if (parsedData.success) {
    const countedProductsStatus = await countProductByStatus(parsedData.data);

    if (countedProductsStatus == null) {
      return notFoundRequest();
    }

    return { numberOfProducts: countedProductsStatus };
  } else {
    return badRequest();
  }
};
