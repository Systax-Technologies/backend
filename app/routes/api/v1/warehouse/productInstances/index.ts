import { ProductInstanceStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  methodNotAllowed,
  notFoundRequest,
} from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import type { ProductInstances } from "~/models/productInstance/productInstance.server";
import {
  createManyProductInstances,
  deleteProductInstance,
  findManyProductInstances,
  updateProductInstance,
} from "~/models/productInstance/productInstance.server";

type LoaderData = {
  productInstances: ProductInstances;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const productInstances = await findManyProductInstances();
  return {
    productInstances,
  };
};

export const action: ActionFunction = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "post":
      postRequest(request);
      break;
    case "patch":
      patchRequest(request);
      break;
    case "delete":
      deleteRequest(request);

    default: {
      throw methodNotAllowed();
    }
  }
};

const postRequest = async (request: Request) => {
  const schema = z.object({
    productId: z.string().cuid(),
    quantity: z.number().min(1),
  });

  const data = await parseBody(request, schema);

  const createdProductInstances = await createManyProductInstances(
    data.productId,
    data.quantity
  );

  throw new Response(
    JSON.stringify({ numberOfCreatedProducts: createdProductInstances }),
    {
      status: 200,
      statusText: "OK",
    }
  );
};

const patchRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(ProductInstanceStatus),
    orderId: z.nullable(z.string().cuid()),
    productId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);

  const updatedProductInstance = await updateProductInstance(data.id, {
    status: data.status,
    orderId: data.orderId,
    productId: data.productId,
  });

  if (!updatedProductInstance) {
    throw notFoundRequest();
  }

  throw new Response(JSON.stringify(updatedProductInstance), {
    status: 200,
    statusText: "OK",
  });
};

const deleteRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const data = await parseBody(request, schema);

  const deletedProductInstance = await deleteProductInstance(data.id);

  if (deletedProductInstance == null) {
    throw notFoundRequest();
  }

  throw new Response(JSON.stringify(deletedProductInstance), {
    status: 200,
    statusText: "Text",
  });
};
