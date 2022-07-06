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

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  switch (request.method.toLowerCase()) {
    case "post":
      return postRequest(request);
    case "patch":
      return patchRequest(request);
    case "delete":
      return deleteRequest(request);
    default:
      return badRequestResponse();
  }
};

const postRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    customerId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const createdActiveProductInstance = await createActiveProductInstance(
    data.customerId,
  );
  return okResponse(JSON.stringify(createdActiveProductInstance));
};

const patchRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
    status: z.nativeEnum(ActiveProductInstanceStatus),
  });

  const data = await parseBody(request, schema);
  const updatedActiveProductInstance = await updateActiveProductInstanceStatus(
    data.activeProductInstanceId,
    data.status,
  );
  return okResponse(JSON.stringify(updatedActiveProductInstance));
};

const deleteRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const deletedActiveProductInstance = await deleteActiveProductInstance(
    data.activeProductInstanceId,
  );
  return okResponse(JSON.stringify(deletedActiveProductInstance));
};
