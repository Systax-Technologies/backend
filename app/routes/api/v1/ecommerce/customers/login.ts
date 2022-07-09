import type { ActionFunction } from "@remix-run/node";
import { methodNotAllowedResponse } from "~/helpers/response-helpers.server";
import { postAuthenticationHandler } from "~/lib/authentication.server";
import { findCustomerByLogin } from "~/models/customer/customer.server";

export const action: ActionFunction = async ({
  request,
}): Promise<ReturnType<typeof postAuthenticationHandler>> => {
  if (request.method.toLowerCase() !== "post") {
    throw methodNotAllowedResponse();
  }

  return postAuthenticationHandler(request, findCustomerByLogin);
};
