import * as jwtLib from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (JWT_SECRET === undefined) {
  throw Error("Environment variable JWT_SECRET is not set!");
}

export const verifyJwt = (jwt: string) => {
  var decoded;
  try {
    decoded = jwtLib.verify(jwt, JWT_SECRET);
  } catch (err) {
    return false;
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
