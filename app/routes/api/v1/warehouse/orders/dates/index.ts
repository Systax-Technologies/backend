import { LoaderFunction } from "@remix-run/node";
import { methodNotAllowed } from "~/helpers/app-helpers.server";

export const loader: LoaderFunction = async () => {
  throw methodNotAllowed();
};
