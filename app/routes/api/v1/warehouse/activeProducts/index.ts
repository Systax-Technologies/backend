import { ActiveProductStatus } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { string, z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import {
  createActiveProduct,
  deleteActiveProduct,
  updateActiveProductStatus,
} from "~/models/activeProduct/activeProduct.server";

type LoaderData = {};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {};

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

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const createdActiveProduct = await createActiveProduct(data.customerId);
    throw new Response(JSON.stringify(createdActiveProduct), {
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

const patchRequest = async (request: Request) => {
  const schema = z.object({
    activeProductId: z.string().cuid(),
    status: z.nativeEnum(ActiveProductStatus),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const updatedActiveProduct = await updateActiveProductStatus(
      data.activeProductId,
      data.status
    );
    throw new Response(JSON.stringify(updatedActiveProduct), {
      status: 200,
      statusText: "Ok",
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
    activeProductId: z.string().cuid(),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const deletedActiveProduct = await deleteActiveProduct(
      data.activeProductId
    );
    throw new Response(JSON.stringify(deletedActiveProduct), {
      status: 200,
      statusText: "Ok",
    });
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};
