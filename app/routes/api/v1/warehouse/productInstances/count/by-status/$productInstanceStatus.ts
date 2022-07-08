import { ProductInstanceStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { countProductInstancesByStatus } from "~/models/productInstance/productInstance.server";

type LoaderData = {
  numberOfProductInstances: number;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  let jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }

  const productInstanceStatus = params.productInstanceStatus;

  if (productInstanceStatus == null) {
    throw badRequestResponse();
  }

  const schema = z.nativeEnum(ProductInstanceStatus);
  const parsedData = schema.safeParse(productInstanceStatus);
  if (parsedData.success) {
    const countedProductInstancesStatus = await countProductInstancesByStatus(
      parsedData.data,
    );

    if (countedProductInstancesStatus == null) {
      throw notFoundResponse();
    }

    return { numberOfProductInstances: countedProductInstancesStatus };
  } else {
    throw badRequestResponse();
  }
};
