import { json, LoaderFunction } from "@remix-run/node";
import { verifyRequest } from "~/lib/verify-request.server";
import { findEmployeeById } from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  if (request.method.toLowerCase() !== "get") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  verifyRequest(request);

  const employeeId = params.employeeId;

  if (employeeId == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }

  const employee = await findEmployeeById(employeeId);

  if (employee == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Employee Not Found",
    });
  }

  return json(employee);
};
