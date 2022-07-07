import { Role } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  forbiddenResponse,
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
import {
  createEmployee,
  findEmployees,
} from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  let jwtContent = verifyRequest<"employee">(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }
  const employees = await findEmployees();
  return okResponse(JSON.stringify({ employees }));
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  if (request.method.toLowerCase() !== "post") {
    throw methodNotAllowedResponse();
  }
  verifyRequest<"employee">(request);

  const schema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role),
  });

  const data = await parseBody(request, schema);

  const createdEmployee = await createEmployee(data);
  return okResponse(JSON.stringify(createdEmployee));
};
