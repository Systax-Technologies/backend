import * as jwtLib from "jsonwebtoken";
import { EnvSchema } from "~/config/EnvSchema.server";
import { unauthorizedResponse } from "./response-helpers.server";

const JWT_SECRET = EnvSchema.get("JWT_SECRET");

export const verifyJwt = (jwt: string) => {
  let decoded;
  try {
    decoded = jwtLib.verify(jwt, JWT_SECRET);
  } catch (err) {
    throw unauthorizedResponse();
  }
  return decoded;
};

export const createJwt = (payload: Record<string, any>) => {
  return jwtLib.sign(payload, JWT_SECRET, {
    expiresIn: 3600,
    algorithm: "HS512",
  });
};
