import type { z } from "zod";
import { badRequestResponse } from "~/helpers/response-helpers.server";

export const parseBody = async <Output, Input>(
  request: Request,
  schema: z.Schema<Output, any, Input>,
): Promise<Output> => {
  let requestBody: any;

  try {
    requestBody = await request.json();
  } catch (e) {
    throw badRequestResponse();
  }

  const parsedData = schema.safeParse(requestBody);

  if (parsedData.success) {
    return parsedData.data;
  } else {
    console.log(parsedData.error);
    throw badRequestResponse();
  }
};
