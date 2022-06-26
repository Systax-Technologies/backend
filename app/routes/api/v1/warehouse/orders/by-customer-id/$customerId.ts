import { Order } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  badRequest,
  methodNotAllowed,
  notFoundRequest,
} from "~/helpers/app-helpers.server";
import { createOrder, findCustomerOrders } from "~/models/order/order.server";

type LoaderData = Order[];

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const customerId = params.customerId;

  if (!customerId) {
    badRequest();
  }

  const orders = await findCustomerOrders(customerId);

  if (!orders || !orders.length) {
    notFoundRequest();
  }

  return orders;
};

export const action: ActionFunction = async ({ request, params }) => {
  const customerId = params.customerId;

  if (!customerId) {
    badRequest();
  }

  if (request.method.toLowerCase() == "post") {
    handlePOSTRequest(customerId);
  } else {
    methodNotAllowed();
  }
};

const handlePOSTRequest = async (customerId: string) => {
  const createdOrder = await createOrder({ customerId });

  console.log(createdOrder);

  if (!createdOrder) {
    badRequest();
  }

  return new Response(JSON.stringify(createdOrder), {
    status: 200,
    statusText: "OK",
  });
};
