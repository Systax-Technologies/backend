import type { ActiveProductInstance } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { verifyRequest } from "~/lib/verify-request.server";
import { findActiveProductInstance } from "~/models/activeProductInstance/activeProductInstance.server";

type LoaderData = ActiveProductInstance;

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const activeProductInstanceId = params.productInstanceId;

  let jwtContent = verifyRequest<"employee">(request);
  if (jwtContent.role !== "ADMIN") {
    throw forbiddenResponse();
  }

  if (activeProductInstanceId == null) {
    throw badRequestResponse();
  }

  const activeProductInstance = await findActiveProductInstance(
    activeProductInstanceId
  );

  if (activeProductInstance == null) {
    throw notFoundResponse();
  }

  return activeProductInstance;
};
