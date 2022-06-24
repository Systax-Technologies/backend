import { ProductStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  methodNotAllowed,
  notFoundRequest,
} from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import type { Products } from "~/models/product/product.server";
import {
  createManyProducts,
  deleteProduct,
  findManyProducts,
  updateProduct,
} from "~/models/product/product.server";

type LoaderData = {
  products: Products;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const products = await findManyProducts();
  return {
    products,
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
    productTypeId: z.string().cuid(),
    quantity: z.number().min(1),
  });

  const data = await parseBody(request, schema);

  const createdProducts = await createManyProducts(
    data.productTypeId,
    data.quantity
  );

  throw new Response(
    JSON.stringify({ numberOfCreatedProducts: createdProducts }),
    {
      status: 200,
      statusText: "OK",
    }
  );
};

const patchRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(ProductStatus),
    orderId: z.nullable(z.string().cuid()),
    productTypeId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);

  const updatedProduct = await updateProduct(data.id, {
    status: data.status,
    orderId: data.orderId,
    productTypeId: data.productTypeId,
  });
  
  if (!updatedProduct) {
    throw notFoundRequest();
  }
  
const deleteRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const data = await parseBody(request, schema);

  const deletedProduct = await deleteProduct(data.id);

  if (deleteProduct == null) {
    throw notFoundRequest();
  }

  throw new Response(JSON.stringify(deletedProduct), {
    status: 200,
    statusText: "Text",
  });
};
