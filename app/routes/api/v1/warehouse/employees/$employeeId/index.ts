import { Role } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { hashPassword } from "~/helpers/crypto.server";
import {
  badRequestResponse,
  forbiddenResponse,
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
import {
  deleteEmployee,
  findEmployee,
  updateEmployee,
} from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  if (request.method.toLowerCase() !== "get") {
    throw methodNotAllowedResponse();
  }

  verifyRequest<"employee">(request);

  const employeeId = params.employeeId;
  if (!employeeId) {
    return badRequestResponse();
  }

  const employee = await findEmployee(employeeId);

  if (employee == null) {
    throw notFoundResponse();
  }

  return okResponse(JSON.stringify(employee));
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const method = request.method.toLowerCase();

  if (method === "patch" || method === "delete") {
    const jwtContent = verifyRequest<"employee">(request);
    if (method === "patch") {
      if (jwtContent.role !== "ADMIN") {
        throw forbiddenResponse();
      }
      const employeeId = params.employeeId;
      if (employeeId == null) {
        throw badRequestResponse();
      }
      const schema = z.object({
        email: z.string(),
        password: z.string().min(8),
        firstName: z.string(),
        lastName: z.string(),
        role: z.nativeEnum(Role),
      });

      const data = await parseBody(request, schema);

      data.password = hashPassword(data.password);

      const updatedEmployee = await updateEmployee(employeeId, data);

      return okResponse(JSON.stringify(updatedEmployee));
    } else {
      if (jwtContent.role !== "ADMIN") {
        throw forbiddenResponse();
      }
      const employeeId = params.employeeId;
      if (employeeId == null) {
        throw badRequestResponse();
      }

      const deletedEmployee = await deleteEmployee(employeeId);

      if (!deletedEmployee) {
        throw notFoundResponse();
      }

      return okResponse(JSON.stringify(deletedEmployee));
    }
  } else {
    return badRequestResponse();
  }
};
