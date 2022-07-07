import type { Employee } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { forbiddenResponse } from "~/helpers/response-helpers.server";
import { verifyRequest } from "~/lib/verify-request.server";
import { findEmployees } from "~/models/employee/employee.server";

type LoaderData = {
  employees: Employee[];
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  let jwtContent = verifyRequest<"employee">(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }
  const employees = await findEmployees();
  return {
    employees,
  };
};
