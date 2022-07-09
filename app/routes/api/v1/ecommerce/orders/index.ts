import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  methodNotAllowedResponse,
  notFoundResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyCustomerRequest } from "~/lib/verify-request.server";
import { createOrder } from "~/models/order/order.server";
import {
  findManyProductInstancesAvailableToOrder,
  updateManyProductInstanceOrders,
} from "~/models/productInstance/productInstance.server";

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post": {
      verifyCustomerRequest(request);
      return handlePOSTRequest(request);
    }

    default: {
      return methodNotAllowedResponse();
    }
  }
};

const handlePOSTRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    customerId: z.string().cuid(),
    products: z
      .object({
        productId: z.string().cuid(),
        quantity: z.number().int().positive(),
      })
      .array(),
  });

  const parsedData = await parseBody(request, schema);

  /* Query to find the `ProductInstance`s necessary for the `Order` */
  let productInstancesIds: string[] = [];
  for (var product of parsedData.products) {
    const queryResult = await findManyProductInstancesAvailableToOrder(
      product.productId,
      product.quantity,
    );

    if (!queryResult) {
      return notFoundResponse();
    }

    productInstancesIds = [...productInstancesIds, ...queryResult];
  }

  /* Query to create the `Order` */
  const createdOrder = await createOrder({ customerId: parsedData.customerId });

  if (!createdOrder) {
    return badRequestResponse();
  }

  /* Query to update the `ProductInstance`s using the array of `id`s previously got */
  await updateManyProductInstanceOrders(productInstancesIds, createdOrder.id);

  return okResponse(JSON.stringify(createdOrder));
};
