import { CreditCard } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { methodNotAllowed } from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { createCustomerCreditCard } from "~/models/customer/customer.server";

export const action: ActionFunction = async ({
  request,
}): Promise<CreditCard> => {
  if (request.method.toLowerCase() != "post") {
    throw methodNotAllowedResponse();
  }
  const schema = z.object({
    customerId: z.string(),
    creditCard: z.object({
      number: z.number(),
      expMonthDate: z.number(),
      expYearDate: z.number(),
      secretCode: z.number(),
    }),
  });

  const data = await parseBody(request, schema);
  const customer = await createCustomerCreditCard(
    data.customerId,
    data.creditCard
  );
  return customer;
};
