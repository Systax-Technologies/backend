import * as crypto from "crypto";

export const verify = async (jwt: string) => {
  const verifyFunction = crypto.createVerify("RSA-SHA256");
  var clearJwt = Buffer.from(jwt, "base64").toString("ascii");

  const pieces = clearJwt.split(".");

  // We only need the first two pieces to verify
  verifyFunction.write(pieces[0] + "." + pieces[1]);
  verifyFunction.end();
  // IMPORTANT: NodeJS expects base64 format, not base64url format!
  const jwtSignatureBase64 = Buffer.from(pieces[2]).toString("base64");

  // IMPORTANT: You need to specify that the `jwtSignatureBase64` data is base64 format,
  // otherwise, it will default to Buffer format and return false
  if (
    !verifyFunction.verify(
      require("process").env.JWT_SECRET,
      jwtSignatureBase64,
      "base64"
    )
  ) {
    throw new Response(null, {
      status: 401,
      statusText: "Unauthenticated",
    });
  }
  return;
};
