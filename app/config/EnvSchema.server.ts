import { Env } from "~/helpers/bloom-helper.server";

export const EnvSchema = Env.define({
  JWT_SECRET: Env.string,
});
