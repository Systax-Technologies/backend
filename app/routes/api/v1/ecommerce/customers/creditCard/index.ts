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
      number: z.number().int().positive(),
      expMonthDate: z.number().int().min(1).max(12),
      expYearDate: z.number().int().min(1970),
      secretCode: z.number().int().positive(),
    }),
  });

  const data = await parseBody(request, schema);
  const creditCard = await createCustomerCreditCard(
    jwtContent.id,
    data.creditCard,
  );
  return creditCard;
};
