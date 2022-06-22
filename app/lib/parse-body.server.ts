import type { z } from "zod";

export const parseBody = async <Output, Input>(
  request: Request,
  schema: z.Schema<Output, any, Input>
): Promise<z.SafeParseReturnType<Input, Output>> => {
  let requestBody: any;

  try {
    requestBody = await request.json();
  } catch (e) {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }

  return schema.safeParse(requestBody);
};
