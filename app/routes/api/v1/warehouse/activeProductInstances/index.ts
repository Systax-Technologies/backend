import { ActiveProductInstanceStatus } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import {
  badRequestResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
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
    default:
      throw badRequestResponse();
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
  throw okResponse(JSON.stringify(createdActiveProductInstance));
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
  throw okResponse(JSON.stringify(updatedActiveProductInstance));
};

const deleteRequest = async (request: Request) => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const deletedActiveProductInstance = await deleteActiveProductInstance(
    data.activeProductInstanceId
  );
  throw okResponse(JSON.stringify(deletedActiveProductInstance));
};
