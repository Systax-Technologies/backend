import { Customer, Employee } from "@prisma/client";
import { z } from "zod";
import { LoginDto } from "~/models/dto";

export const postAuthenticationHandler = async <
  ReturnHandlerLogin extends Employee | Customer | null,
  HandlerLogin extends (loginDto: LoginDto) => Promise<ReturnHandlerLogin>
>(
  request: Request,
  handlerLogin: HandlerLogin
) => {
  let body: any;
  try {
    body = await request.json();
  } catch (e) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const loginSchema = z.object({
    email: z.string().email(),
    // the password is hashed, so it must be at least 64 chars
    password: z.string().min(64),
  });

  const parsedData = loginSchema.safeParse(body);

  if (parsedData.success) {
    const { email, password } = parsedData.data;

    const user = await handlerLogin({
      email,
      password,
    });

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
};