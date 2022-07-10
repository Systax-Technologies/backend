import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import type { ProductInstances } from "~/models/dto";
import {
  createManyProductInstances,
  findManyProductInstances,
} from "~/models/productInstance/productInstance.server";

type LoaderData = {
  productInstances: ProductInstances;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  await verifyEmployeeRequest(request);
  const productInstances = await findManyProductInstances();
  return {
    productInstances,
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  if (request.method.toLowerCase() !== "post") {
    return methodNotAllowedResponse();
  }

  await verifyEmployeeRequest(request);

  return handlePOSTRequest(request);
};

const handlePOSTRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().positive(),
  });

  const data = await parseBody(request, schema);

  const createdProductInstances = await createManyProductInstances(
    data.productId,
    data.quantity,
  );

  return okResponse(
    JSON.stringify({ numberOfCreatedProducts: createdProductInstances }),
  );
};
