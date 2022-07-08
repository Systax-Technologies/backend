import type { LoaderFunction } from "@remix-run/node";
import { okResponse } from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import { findEmployee } from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({ request }) => {
  const jwtContent = await verifyEmployeeRequest(request);
  const employee = await findEmployee(jwtContent.id);
  return okResponse(JSON.stringify(employee));
};
