import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  throw new Response(null, {
    status: 400,
    statusText: "Order Id Not Provided",
  });
};
