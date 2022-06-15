import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params, request }) => {
  const userId = params.userId;
};
