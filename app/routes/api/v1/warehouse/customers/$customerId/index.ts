import { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import {
  deleteCustomer,
  findCustomer,
} from "~/models/customer/customer.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  if (request.method.toLowerCase() !== "get") {
    return methodNotAllowedResponse();
  }

  await verifyEmployeeRequest(request);

  const customerId = params.customerId;
  if (!customerId) {
    return badRequestResponse();
  }

  const customer = await findCustomer(customerId);

  if (!customer) {
    return notFoundResponse();
  }

  return okResponse(JSON.stringify(customer));
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "delete": {
      await verifyEmployeeRequest(request);
      const customerId = params.customerId;
      if (!customerId) {
        return badRequestResponse();
      }

      const customer = await deleteCustomer(customerId);
      if (!customer) {
        return notFoundResponse();
      }

      return okResponse(JSON.stringify(customer));
    }

    default: {
      return methodNotAllowedResponse();
    }
  }
};
