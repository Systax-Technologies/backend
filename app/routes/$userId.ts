import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params, request }) => {
  if (request.method.toLowerCase() !== "get") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }
  const userId = params.userId;
};
