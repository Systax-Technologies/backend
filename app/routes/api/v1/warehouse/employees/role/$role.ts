import type { Employee } from "@prisma/client";
import { Role } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { findEmployeeByRole } from "~/models/employee/employee.server";

type LoaderData = Employee[];

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  if (request.method.toLowerCase() != "get") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  const role = params.role;

  if (role == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Role Not Provided",
    });
  }

  const schema = z.nativeEnum(Role);
  const parsedData = schema.safeParse(role);

  if (parsedData.success) {
    const employee = await findEmployeeByRole(parsedData.data);

    if (employee == null) {
      throw new Response(null, {
        status: 404,
        statusText: "Employee Not Found",
      });
    }

    return employee;
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
};
