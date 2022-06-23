import { verifyJwt } from "~/helpers/jwt-helper.server";

export const verifyRequest = (request: Request) => {
  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader) {
    const [_, jwt] = authorizationHeader.split(" ");
    return verifyJwt(jwt);
  } else {
    throw new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
};
