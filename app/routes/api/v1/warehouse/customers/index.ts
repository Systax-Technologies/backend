import type { LoaderFunction } from "@remix-run/node";
import { okResponse } from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findCustomers } from "~/models/customer/customer.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  await verifyEmployeeRequest(request);
  const customers = await findCustomers();
  return okResponse(JSON.stringify({ customers }));
};
