import type { ActiveProductInstance } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import { findActiveProductInstance } from "~/models/activeProductInstance/activeProductInstance.server";

type LoaderData = ActiveProductInstance;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const activeProductInstanceId = params.productInstanceId;

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
