import type { z } from "zod";

export const parseBody = async <Output, Input>(
  request: Request,
  schema: z.Schema<Output, any, Input>,
): Promise<Output> => {
  let requestBody: any;

  try {
    requestBody = await request.json();
  } catch (e) {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }

  const parsedData = schema.safeParse(requestBody);

  if (parsedData.success) {
    return parsedData.data;
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};
