import * as crypto from "crypto";
import { EnvSchema } from "~/config/EnvSchema.server";

const PASS_SECRET = EnvSchema.get("PASS_SECRET");

export const hashPassword = (password: string): string => {
  return crypto
    .createHash("sha256")
    .update(password + PASS_SECRET)
    .digest("hex");
};
