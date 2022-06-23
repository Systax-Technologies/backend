import { ProductStatus } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { countProductByStatus } from "~/models/product/product.server";

type LoaderData = {
  numberOfProducts: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productStatus = params.productStatus;

  if (productStatus == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
  const schema = z.nativeEnum(ProductStatus);
  const parsedData = schema.safeParse(productStatus);
  if (parsedData.success) {
    const countedProductsStatus = await countProductByStatus(parsedData.data);

    if (countedProductsStatus == null) {
      throw new Response(null, {
        status: 404,
        statusText: "Product Type Not Found",
      });
    }

    return { numberOfProducts: countedProductsStatus };
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
};
