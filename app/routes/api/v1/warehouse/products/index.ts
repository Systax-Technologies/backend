import { ProductStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import {
  countProductByStatus,
  countProductByType,
  createManyProducts,
  deleteProduct,
  findManyProducts,
  Products,
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
      throw new Response(null, {
        status: 405,
        statusText: "Invalid Method",
      });
    }
  }
};

const postRequest = async (request: Request) => {
  const schema = z.object({
    productTypeId: z.string().cuid(),
    quantity: z.number().min(1),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const createdProducts = await createManyProducts(
      data.productTypeId,
      data.quantity,
    );
    throw new Response(
      JSON.stringify({ numberOfCreatedProducts: createdProducts }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};

const patchRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
    status: z.nativeEnum(ProductStatus),
    orderId: z.nullable(z.string().cuid()),
    productTypeId: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const updatedProduct = await updateProduct(data.id, {
      status: data.status,
      orderId: data.orderId,
      productTypeId: data.productTypeId,
    });
    throw new Response(JSON.stringify(updatedProduct), {
      status: 200,
      statusText: "OK",
    });
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};

const deleteRequest = async (request: Request) => {
  const schema = z.object({
    id: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  if(parsedData.success) {
    const data = parsedData.data;
    const deletedProduct = await deleteProduct(data.id);


  throw new Response(JSON.stringify(deletedProduct), {
    status: 200,
    statusText: "Text",
  });
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};
