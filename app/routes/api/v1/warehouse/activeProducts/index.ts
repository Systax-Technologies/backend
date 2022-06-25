import { ActiveProductStatus } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { string, z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import {
  createActiveProduct,
  deleteActiveProduct,
  updateActiveProductStatus,
} from "~/models/activeProduct/activeProduct.server";

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
      break;
  }
};

const postRequest = async (request: Request) => {
  const schema = z.object({
    customerId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const createdActiveProduct = await createActiveProduct(data.customerId);
  throw new Response(JSON.stringify(createdActiveProduct), {
    status: 200,
    statusText: "OK",
  });
};

const patchRequest = async (request: Request) => {
  const schema = z.object({
    activeProductId: z.string().cuid(),
    status: z.nativeEnum(ActiveProductStatus),
  });

  const data = await parseBody(request, schema);
  const updatedActiveProduct = await updateActiveProductStatus(
    data.activeProductId,
    data.status
  );
  throw new Response(JSON.stringify(updatedActiveProduct), {
    status: 200,
    statusText: "Ok",
  });
};

const deleteRequest = async (request: Request) => {
  const schema = z.object({
    activeProductId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const deletedActiveProduct = await deleteActiveProduct(data.activeProductId);
  throw new Response(JSON.stringify(deletedActiveProduct), {
    status: 200,
    statusText: "Ok",
  });
};
