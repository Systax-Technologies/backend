import { Customer } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { badRequest, notFoundRequest } from "~/helpers/response-helpers.server";
import { findCustomer } from "~/models/customer/customer.server";

type LoaderData = Customer;
export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData | null> => {
  const customerId = params.customerId;

  if (customerId == null) {
    throw badRequestResponse();
  }

  const customer = await findCustomer(customerId);

  if (customer == null) {
    throw notFoundResponse();
  }

  return customer;
};
