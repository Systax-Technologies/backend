import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from "zod";
import { hashPassword } from "~/helpers/crypto.server";
import { methodNotAllowedResponse } from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyRequest } from "~/lib/verify-request.server";
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
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    bllingAddressId: z.string().nullable(),
    shippingAddressId: z.string().nullable(),
  });

  const data = await parseBody(request, schema);

  data.password = hashPassword(data.password);

  const createdCustomer = await createCustomer(data);

  return json(createdCustomer);
};

export const patchRequest = async (request: Request): Promise<Response> => {
  let jwtContent = verifyRequest<"customer">(request);

  const schema = z.object({
    customer: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string(),
      lastName: z.string(),
    }),
  });

  const data = await parseBody(request, schema);

  data.customer.password = hashPassword(data.customer.password);

  const updatedCustomer = await updateCustomer(jwtContent.id, data.customer);
  return json(updatedCustomer);
};

export const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.string();

  const data = await parseBody(request, schema);
  const deletedCustomer = await deleteCustomer(data);
  return json(deletedCustomer);
};
