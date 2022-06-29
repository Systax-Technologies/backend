import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { methodNotAllowed } from "~/helpers/app-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import {
  deleteProductType,
  updateProductType,
} from "~/models/product/productType.server";

export const action: ActionFunction = async ({ request, params }) => {
  const productTypeId = params.productTypeId;

  if (productTypeId == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  switch (request.method.toLowerCase()) {
    case "patch": {
      handlePATCHRequest(productTypeId, request);
    }

    case "delete": {
      handleDELETERequest(productTypeId);
    }

    default: {
      methodNotAllowed();
    }
  }
};

const handlePATCHRequest = async (id: string, request: Request) => {
  const patchSchema = z.object({
    model: z.string(),
    imageUrl: z.string(),
    description: z.string(),
    color: z.string(),
    size: z.string(),
    price: z.number(),
  });

  const data = await parseBody(request, patchSchema);

  const productType = await updateProductType(id, data);

  if (productType == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  throw new Response(JSON.stringify(productType), {
    status: 200,
    statusText: "OK",
  });
};

const handleDELETERequest = async (id: string) => {
  const productType = await deleteProductType(id);

  if (productType == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  throw new Response(JSON.stringify(productType), {
    status: 200,
    statusText: "200",
  });
};
