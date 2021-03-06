import { Role } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { hashPassword } from "~/helpers/crypto.server";
import {
  forbiddenResponse,
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import {
  createEmployee,
  findEmployees,
} from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  let jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }
  const employees = (await findEmployees()).filter(
    (el) => el.id !== jwtContent.id,
  );
  return okResponse(JSON.stringify({ employees }));
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  if (request.method.toLowerCase() !== "post") {
    throw methodNotAllowedResponse();
  }
  let jwtContent = await verifyEmployeeRequest(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role),
  });

  const data = await parseBody(request, schema);

  data.password = hashPassword(data.password);

  const createdEmployee = await createEmployee(data);
  return okResponse(JSON.stringify(createdEmployee));
};
