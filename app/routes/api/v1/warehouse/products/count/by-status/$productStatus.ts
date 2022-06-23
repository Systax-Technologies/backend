import { ProductStatus } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { countProductByStatus } from "~/models/product/product.server";

type LoaderData = number;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productStatus = params.productStatus;

  if (productStatus == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Product Status Not Provided",
    });
  }
  const schema = z.nativeEnum(ProductStatus);
  const parsedData = schema.safeParse(productStatus);
  if (parsedData.success){
      const countedPoductsStatus = await countProductByStatus(parsedData.data);
    
      if (countedPoductsStatus == null) {
        throw new Response(null, {
          status: 404,
          statusText: "Product Type Not Found",
        });
      }
    
      return countedPoductsStatus;

  
  } else {
    throw new Response(null, {
        status: 400,
        statusText: "Invalid Request",
      });
  }


};