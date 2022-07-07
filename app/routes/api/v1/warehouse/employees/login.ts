import type { ActionFunction } from "@remix-run/node";
import { methodNotAllowedResponse } from "~/helpers/response-helpers.server";
import { postAuthenticationHandler } from "~/lib/authentication.server";
import { findEmployeeByLogin } from "~/models/employee/employee.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() !== "post") {
    throw methodNotAllowedResponse();
  }

  return postAuthenticationHandler(request, findEmployeeByLogin);
};
