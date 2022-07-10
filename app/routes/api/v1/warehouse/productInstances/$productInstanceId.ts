import type { ProductInstance } from "@prisma/client";
import { ProductInstanceStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  forbiddenResponse,
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import {
  deleteProductInstance,
  findProductInstance,
  updateProductInstance,
} from "~/models/productInstance/productInstance.server";

type LoaderData = ProductInstance;

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  await verifyEmployeeRequest(request);

  const productInstanceId = params.productInstanceId;

  if (productInstanceId == null) {
    throw badRequestResponse();
  }

  const productInstance = await findProductInstance(productInstanceId);

  if (productInstance == null) {
    throw notFoundResponse();
  }

  return productInstance;
};

export const action: ActionFunction = async ({ request, params }) => {
  const productInstanceId = params.productInstanceId;

  if (productInstanceId == null) {
    throw badRequestResponse();
  }

  switch (request.method.toLowerCase()) {
    case "patch": {
      return handlePATCHRequest(request, productInstanceId);
    }
    case "delete": {
      return handleDELETERequest(request, productInstanceId);
    }
    default: {
      return methodNotAllowedResponse();
    }
  }
};
const handlePATCHRequest = async (
  request: Request,
  productInstanceId: string,
): Promise<Response> => {
  const jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }
  const schema = z.object({
    status: z.nativeEnum(ProductInstanceStatus),
    orderId: z.nullable(z.string().cuid()),
    productId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);

  const updatedProductInstance = await updateProductInstance(
    productInstanceId,
    {
      status: data.status,
      orderId: data.orderId,
      productId: data.productId,
    },
  );

  if (!updatedProductInstance) {
    return notFoundResponse();
  }

  return okResponse(JSON.stringify(updatedProductInstance));
};

const handleDELETERequest = async (
  request: Request,
  productInstanceId: string,
): Promise<Response> => {
  await verifyEmployeeRequest(request);

  const deletedProductInstance = await deleteProductInstance(productInstanceId);

  if (deletedProductInstance == null) {
    return notFoundResponse();
  }

  throw okResponse(JSON.stringify(deletedProductInstance));
};
