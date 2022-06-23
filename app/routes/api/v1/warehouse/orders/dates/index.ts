import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  throw new Response(null, {
    status: 405,
    statusText: "Method Not Allowed",
  });
};
