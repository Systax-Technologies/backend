import { ActiveProductInstanceStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import {
  forbiddenResponse,
  methodNotAllowedResponse,
  okResponse,
} from "~/helpers/response-helpers.server";
import { parseBody } from "~/lib/parse-body.server";
import { verifyEmployeeRequest } from "~/lib/verify-request.server";
import {
  createActiveProduct,
  deleteActiveProduct,
  findActiveProducts,
  updateActiveProductStatus,
} from "~/models/activeProducts/activeProducts.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const method = request.method.toLowerCase();
  if (method !== "get") {
    return methodNotAllowedResponse();
  }

  await verifyEmployeeRequest(request);

  const activeProducts = await findActiveProducts();
  return okResponse(JSON.stringify({ activeProducts }));
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const map: Record<string, (request: Request) => Promise<Response>> = {
    post: handlePOSTRequest,
    patch: handlePATCHRequest,
    delete: handleDELETERequest,
  };

  const method = request.method.toLowerCase();

  if (method in map) {
    let jwtContent = await verifyEmployeeRequest(request);
    if (jwtContent.role !== "ADMIN") {
      throw forbiddenResponse();
    }
    return map[method](request);
  } else {
    throw methodNotAllowedResponse();
  }
};

const handlePOSTRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    customerId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const createdActiveProductInstance = await createActiveProduct(
    data.customerId,
  );
  return okResponse(JSON.stringify(createdActiveProductInstance));
};

const handlePATCHRequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
    status: z.nativeEnum(ActiveProductInstanceStatus),
  });

  const data = await parseBody(request, schema);
  const updatedActiveProductInstance = await updateActiveProductStatus(
    data.activeProductInstanceId,
    data.status,
  );
  return okResponse(JSON.stringify(updatedActiveProductInstance));
};

const handleDELETERequest = async (request: Request): Promise<Response> => {
  const schema = z.object({
    activeProductInstanceId: z.string().cuid(),
  });

  const data = await parseBody(request, schema);
  const deletedActiveProductInstance = await deleteActiveProduct(
    data.activeProductInstanceId,
  );
  return okResponse(JSON.stringify(deletedActiveProductInstance));
};
