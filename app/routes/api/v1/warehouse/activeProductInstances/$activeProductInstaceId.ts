import { ActiveProductInstance } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { findActiveProductInstance } from "~/models/activeProductInstance/activeProductInstance.server";

type LoaderData = ActiveProductInstance;

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const activeProductInstanceId = params.productInstanceId;

  if (activeProductInstanceId == null) {
    throw new Response(null, {
      status: 400,
      statusText: "Product Instance Id Not Provided",
    });
  }

  const activeProductInstance = await findActiveProductInstance(
    activeProductInstanceId
  );

  if (activeProductInstance == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Product Not Found",
    });
  }

  return activeProductInstance;
};
