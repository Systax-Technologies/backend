import { ActionFunction } from "@remix-run/node";
import { postAuthenticationHandler } from "~/lib/authentication.server";
import { findCustomerByLogin } from "~/models/customer/customer.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  await postAuthenticationHandler(request, findCustomerByLogin);
};
