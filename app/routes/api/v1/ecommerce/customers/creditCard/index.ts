import type { CreditCard } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { methodNotAllowedResponse } from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyCustomerRequest } from "~/lib/verify-request.server";
import { createCustomerCreditCard } from "~/models/customer/customer.server";

export const action: ActionFunction = async ({
  request,
}): Promise<CreditCard> => {
  if (request.method.toLowerCase() != "post") {
    throw methodNotAllowedResponse();
  }

  let jwtContent = await verifyCustomerRequest(request);

  const schema = z.object({
    creditCard: z.object({
      number: z.number(),
      expMonthDate: z.number(),
      expYearDate: z.number(),
      secretCode: z.number(),
    }),
  });

  const data = await parseBody(request, schema);
  const customer = await createCustomerCreditCard(
    jwtContent.id,
    data.creditCard,
  );
  return customer;
};
