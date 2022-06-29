import { verifyJwt } from "~/helpers/jwt-helper.server";
import { unauthorizedResponse } from "~/helpers/response-helpers.server";

export const verifyRequest = (request: Request) => {
  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader) {
    const [_, jwt] = authorizationHeader.split(" ");
    return verifyJwt(jwt);
  } else {
    throw unauthorizedResponse();
  }
};
