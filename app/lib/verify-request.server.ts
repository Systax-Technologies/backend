import { Role } from "@prisma/client";
import { z } from "zod";
import { verifyJwt } from "~/helpers/jwt-helper.server";
import {
  badRequestResponse,
  unauthorizedResponse,
} from "~/helpers/response-helpers.server";

type Employee = {
  id: string;
  role: Role;
};

type Customer = {
  id: string;
};

type ReturnType<T> = T extends "customer"
  ? Customer
  : T extends "employee"
  ? Employee
  : never;

/**
 * Verify the authenticity of a request's JWT
 * @param request The request to verify
 * @returns The data contained in the JWT
 */
export const verifyRequest = <UserType extends "customer" | "employee">(
  request: Request
): ReturnType<UserType> => {
  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, jwt] = authorizationHeader.split(" ");
    const decodedJwt = verifyJwt(jwt);
    let parsedData: z.SafeParseReturnType<any, any>;
    const schema = z.object({
      id: z.string(),
      role: z.optional(z.nativeEnum(Role)),
    });

    parsedData = schema.safeParse(
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
