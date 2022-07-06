import { Employee, Role } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
import {
  createEmployee,
  deleteEmployee,
  findEmployee,
  updateEmployee,
} from "~/models/employee/employee.server";

type LoaderData = {
  employee: Employee;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  if (request.method.toLowerCase() !== "get") {
    throw methodNotAllowedResponse();
  }

  const data = verifyRequest(request);

  const employee = await findEmployee(data.id);

  if (employee == null) {
    throw notFoundResponse();
  }

  return json(employee);
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post":
      return postRequest(request);
    case "patch":
      return patchRequest(request);
    case "delete":
      return deleteRequest(request);
    default:
      return methodNotAllowedResponse();
  }
};

const postRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role),
  });

  const data = await parseBody(request, schema);

  const createdEmployee = await createEmployee(data);
  return json(createdEmployee);
};

const patchRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    id: z.string().cuid(),
    employee: z.object({
      email: z.string(),
      password: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      role: z.nativeEnum(Role),
    }),
  });

  const data = await parseBody(request, schema);

  const updatedEmployee = await updateEmployee(data.id, data.employee);
  return json(updatedEmployee);
};

const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.string();

  const data = await parseBody(request, schema);

  const deletedEmployee = await deleteEmployee(data);
  return json(deletedEmployee);
};
