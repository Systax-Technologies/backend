import { LoaderFunction } from "@remix-run/node";
import { badRequest } from "~/helpers/app-helpers.server";

export const loader: LoaderFunction = async () => {
  badRequest();
};
