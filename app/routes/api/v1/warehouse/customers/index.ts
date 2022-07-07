import { LoaderFunction } from "@remix-run/node";
import { okResponse } from "~/helpers/response-helpers.server";
import { verifyRequest } from "~/lib/verify-request.server";
import { findCustomers } from "~/models/customer/customer.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  verifyRequest<"employee">(request);
  const customers = await findCustomers();
  return okResponse(JSON.stringify({ customers }));
};
