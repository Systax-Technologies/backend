import { ProductInstanceStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { badRequest, notFoundRequest } from "~/helpers/app-helpers.server";
import { countProductInstancesByStatus } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProductInstances: number;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const productInstanceStatus = params.productInstanceStatus;

  if (productInstanceStatus == null) {
    throw badRequest();
  }

  const schema = z.nativeEnum(ProductInstanceStatus);
  const parsedData = schema.safeParse(productInstanceStatus);
  if (parsedData.success) {
    const countedProductInstancesStatus = await countProductInstancesByStatus(
      parsedData.data
    );

    if (countedProductInstancesStatus == null) {
      throw notFoundRequest();
    }

    return { numberOfProductInstances: countedProductInstancesStatus };
  } else {
    throw badRequest();
  }
};
