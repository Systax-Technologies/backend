import { ProductStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { countProductInstancesByStatus } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProducts: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productStatus = params.productStatus;

  if (productStatus == null) {
    throw badRequest();
  }

  const schema = z.nativeEnum(ProductStatus);
  const parsedData = schema.safeParse(productStatus);
  if (parsedData.success) {
    const countedProductsStatus = await countProductInstancesByStatus(
      parsedData.data,
    );

    if (countedProductsStatus == null) {
      throw notFoundRequest();
    }

    return { numberOfProducts: countedProductsStatus };
  } else {
    throw badRequest();
  }
};
