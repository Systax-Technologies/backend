import * as jwtLib from "jsonwebtoken";
import { EnvSchema } from "~/config/EnvSchema.server";

const JWT_SECRET = EnvSchema.get("JWT_SECRET");

export const verifyJwt = (jwt: string) => {
  let decoded;
  try {
    decoded = jwtLib.verify(jwt, JWT_SECRET);
  } catch (err) {
    throw new Response(null, { status: 401, statusText: "Unauthenticated" });
  }
  return decoded.toString();
};

export const createJwt = (payload: object) => {
  payload = payload || {};
  return jwtLib.sign(JSON.stringify(payload), JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS512",
  });
};
