import type { Customer, Employee } from "@prisma/client";
import { z } from "zod";
import { hashPassword } from "~/helpers/crypto.server";
import { createJwt } from "~/helpers/jwt-helper.server";
import {
  badRequestResponse,
  notFoundResponse,
} from "~/helpers/response-helpers.server";
import type { LoginDto } from "~/models/dto";

type AccessToken = {
  accessToken: string;
};

export const postAuthenticationHandler = async <
  ReturnHandlerLogin extends Employee | Customer | null,
  HandlerLogin extends (loginDto: LoginDto) => Promise<ReturnHandlerLogin>
>(
  request: Request,
  handlerLogin: HandlerLogin
): Promise<AccessToken> => {
  let body: any;
  try {
    body = await request.json();
  } catch (e) {
    throw badRequestResponse();
  }

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const parsedData = loginSchema.safeParse(body);

  if (parsedData.success) {
    const { email, password } = parsedData.data;

    const user = await handlerLogin({
      email,
      password: hashPassword(password),
    });

    if (user) {
      if ("role" in user) {
        return {
          accessToken: createJwt({ id: user.id, role: user.role }),
        };
      } else {
        return {
          accessToken: createJwt({ id: user.id }),
        };
      }
    } else {
      throw notFoundResponse();
    }
  } else {
    throw badRequestResponse();
  }
};
