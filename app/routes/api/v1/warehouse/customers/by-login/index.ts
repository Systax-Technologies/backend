import { Customer } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { methodNotAllowed } from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { findCustomerByLogin } from "~/models/customer/customer.server";

export const action: ActionFunction = async ({
  request,
}): Promise<Customer | null> => {
  if (request.method.toLowerCase() != "post") {
    throw methodNotAllowedResponse();
  }
  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const data = await parseBody(request, schema);
  const customer = await findCustomerByLogin(data);

  return customer;
};
