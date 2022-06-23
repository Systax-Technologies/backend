import { Role } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
import {
  createEmployee,
  deleteEmployee,
  findEmployeeById,
  updateEmployee,
} from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method.toLowerCase() !== "get") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  const jwt = verifyRequest(request);

  const schema = z.object({
    id: z.string(),
  });

  const parsedData = schema.safeParse(
    typeof jwt === "string" ? JSON.parse(jwt) : jwt
  );

  if (parsedData.success) {
    const employee = await findEmployeeById(parsedData.data.id);

    if (employee == null) {
      throw new Response(null, {
        status: 404,
        statusText: "Employee Not Found",
      });
    }

    return json(employee);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
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
      throw new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
      });
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

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const createdEmployee = await createEmployee(data);
    return json(createdEmployee);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
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

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const updatedEmployee = await updateEmployee(data.id, data.employee);
    return json(updatedEmployee);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
};

const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.string();

  const parsedData = schema.safeParse(schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const deletedEmployee = await deleteEmployee(data);
    return json(deletedEmployee);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
};
