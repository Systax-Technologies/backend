import { Role } from "@prisma/client";
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

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method.toLowerCase() !== "get") {
    throw methodNotAllowedResponse();
  }

  const jwt = verifyRequest(request);

  const schema = z.object({
    id: z.string(),
    role: z.nullable(z.nativeEnum(Role)),
  });

  const parsedData = schema.safeParse(
    typeof jwt === "string" ? JSON.parse(jwt) : jwt
  );

  if (parsedData.success) {
    const employee = await findEmployee(parsedData.data.id);

    if (employee == null) {
      throw notFoundResponse();
    }

    return json(employee);
  } else {
    throw badRequestResponse();
  }
};

export const action: ActionFunction = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "post":
      return postRequest(request);
    case "patch":
      return patchRequest(request);
    case "delete":
      return deleteRequest(request);
    default:
      throw methodNotAllowedResponse();
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
