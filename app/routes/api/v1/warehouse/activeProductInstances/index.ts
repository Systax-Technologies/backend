import { ActiveProductInstanceStatus } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import {
  createActiveProductInstance,
  deleteActiveProductInstance,
  updateActiveProductInstanceStatus,
} from "~/models/activeProductInstance/activeProductInstance.server";

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
  const createdActiveProductInstance = await createActiveProductInstance(
    data.customerId
  );
  throw new Response(JSON.stringify(createdActiveProductInstance), {
    status: 200,
    statusText: "OK",
  });
};

const patchRequest = async (request: Request) => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
    status: z.nativeEnum(ActiveProductInstanceStatus),
  });

  const data = await parseBody(request, schema);
  const updatedActiveProductInstance = await updateActiveProductInstanceStatus(
    data.activeProductInstanceId,
    data.status
  );
  throw new Response(JSON.stringify(updatedActiveProductInstance), {
    status: 200,
    statusText: "Ok",
  });
};

const deleteRequest = async (request: Request) => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const deletedActiveProductInstance = await deleteActiveProductInstance(
    data.activeProductInstanceId
  );
  throw new Response(JSON.stringify(deletedActiveProductInstance), {
    status: 200,
    statusText: "Ok",
  });
};
