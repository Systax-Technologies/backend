import { ActionFunction, json } from "@remix-run/node";
import { string, z } from "zod";
import { methodNotAllowed } from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "~/models/customer/customer.server";
import { meta } from "~/root";

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
  const schema = z.object({
    id: z.string().cuid(),
    customer: z.object({
      email: z.string(),
      password: z.string(),
      firstName: string(),
      lastName: string(),
    }),
  });

  const data = await parseBody(request, schema);

  const updatedCustomer = await updateCustomer(data.id, data.customer);
  return json(updatedCustomer);
};

export const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.string();

  const data = await parseBody(request, schema);
  const deletedCustomer = await deleteCustomer(data);
  return json(deletedCustomer);
};
