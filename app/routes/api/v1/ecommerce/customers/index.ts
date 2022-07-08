import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { string, z } from "zod";
import { methodNotAllowedResponse } from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "~/models/customer/customer.server";

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

export const postRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    bllingAddressId: z.string().nullable(),
    shippingAddressId: z.string().nullable(),
  });

  const data = await parseBody(request, schema);

  const createdCustomer = await createCustomer(data);

  return json(createdCustomer);
};

export const patchRequest = async (request: Request): Promise<Response> => {
  let jwtContent = await verifyEmployeeRequest<"customer">(request);

  const schema = z.object({
    customer: z.object({
      email: z.string(),
      password: z.string(),
      firstName: string(),
      lastName: string(),
    }),
  });

  const data = await parseBody(request, schema);

  const updatedCustomer = await updateCustomer(jwtContent.id, data.customer);
  return json(updatedCustomer);
};

export const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.string();

  const data = await parseBody(request, schema);
  const deletedCustomer = await deleteCustomer(data);
  return json(deletedCustomer);
};
