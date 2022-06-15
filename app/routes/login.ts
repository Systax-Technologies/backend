import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { verify } from "~/helpers/jwt-helper.server";
import { findUserByLogin } from "~/models/user.server";

type ActionData = {
  id: string;
};

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const authorizationHeader = request.headers.get("Authorization");
  if (authorizationHeader) {
    const [_, jwt] = authorizationHeader.split(" ");
    verify(jwt);

    const body = await request.json();

    const loginSchema = z.object({
      email: z.string().email(),
      // the password is hashed, so it must be at least 64 chars
      password: z.string().min(64),
    });

    const parsedData = loginSchema.safeParse(body);

    if (parsedData.success) {
      const data = parsedData.data;

      const user = await findUserByLogin(data.email, data.password);

      if (user) {
        return {
          id: user.id,
        };
      } else {
        throw new Response(null, {
          status: 404,
          statusText: "User not found",
        });
      }
    } else {
      throw new Response(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }
  } else {
    throw new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
};
