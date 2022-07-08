import { Role } from "@prisma/client";
import { z } from "zod";
import { verifyJwt } from "~/helpers/jwt-helper.server";
import {
  badRequestResponse,
  unauthorizedResponse,
} from "~/helpers/response-helpers.server";
import { findEmployee } from "~/models/employee/employee.server";

/**
 * Verify the authenticity of an employee request's JWT
 * @param request The request to verify
 * @returns The data contained in the JWT
 */
export const verifyEmployeeRequest = async (
  request: Request,
): Promise<{
  id: string;
  role: Role;
}> => {
  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, jwt] = authorizationHeader.split(" ");
    const decodedJwt = verifyJwt(jwt);
    const schema = z.object({
      id: z.string(),
      role: z.nativeEnum(Role),
    });

    const parsedData = schema.safeParse(
      typeof decodedJwt === "string" ? JSON.parse(decodedJwt) : decodedJwt,
    );

    if (parsedData.success) {
      const employee = await findEmployee(parsedData.data.id);

      if (employee == null) {
        throw unauthorizedResponse();
      }

      return parsedData.data;
    } else {
      throw badRequestResponse();
    }
  } else {
    throw unauthorizedResponse();
  }
};

export const verifyCustomerRequest = async (
  request: Request,
): Promise<{ id: string }> => {
  return {
    id: "",
  };
};
