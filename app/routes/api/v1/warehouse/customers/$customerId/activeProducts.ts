import { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { verifyRequest } from "~/lib/verify-request.server";
import { findCustomerActiveProducts } from "~/models/customer/customer.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const method = request.method.toLowerCase();

  if (method !== "get") {
    return badRequestResponse();
  }

  verifyRequest<"employee">(request);

  const customerId = params.customerId;
  if (!customerId) {
    return badRequestResponse();
  }

  const customerActiveProducts = await findCustomerActiveProducts(customerId);

  if (!customerActiveProducts) {
    return notFoundResponse();
  }

  return okResponse(JSON.stringify({ activeProducts: customerActiveProducts }));
};
