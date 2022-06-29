import { ProductInstanceStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { countProductInstancesByStatus } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProductInstances: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productInstanceStatus = params.productInstanceStatus;

  if (productInstanceStatus == null) {
    throw badRequestResponse();
  }

  const schema = z.nativeEnum(ProductInstanceStatus);
  const parsedData = schema.safeParse(productInstanceStatus);
  if (parsedData.success) {
    const countedProductInstancesStatus = await countProductInstancesByStatus(
      parsedData.data
    );

    if (countedProductInstancesStatus == null) {
      throw notFoundResponse();
    }

    return { numberOfProductInstances: countedProductInstancesStatus };
  } else {
    throw badRequestResponse();
  }
};
