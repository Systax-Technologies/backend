import { Role } from "@prisma/client";
import { z } from "zod";
import { verifyJwt } from "~/helpers/jwt-helper.server";
import {
  badRequestResponse,
  unauthorizedResponse,
} from "~/helpers/response-helpers.server";

/**
 * Verify the authenticity of a request's JWT
 * @param request The request to verify
 * @returns The data contained in the JWT
 */
export const verifyRequest = (request: Request) => {
  const schema = z.object({
    id: z.string(),
    role: z.nullable(z.nativeEnum(Role)),
  });

  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader) {
    const [_, jwt] = authorizationHeader.split(" ");
    const decodedJwt = verifyJwt(jwt);
    const parsedData = schema.safeParse(
      typeof decodedJwt === "string" ? JSON.parse(decodedJwt) : decodedJwt
    );
    if (parsedData.success) {
      return parsedData.data;
    } else {
      throw badRequestResponse();
    }
  } else {
    throw unauthorizedResponse();
  }
};
