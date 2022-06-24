import type { z } from "zod";
import { badRequest } from "~/helpers/app-helpers.server";

export const parseBody = async <Output, Input>(
  request: Request,
  schema: z.Schema<Output, any, Input>
): Promise<Output> => {
  let requestBody: any;

  try {
    requestBody = await request.json();
  } catch (e) {
    throw badRequest();
  }

  const parsedData = schema.safeParse(requestBody);

  if (parsedData.success) {
    return parsedData.data;
  } else {
    throw badRequest();
  }
};
