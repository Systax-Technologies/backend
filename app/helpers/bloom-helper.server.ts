import { z, ZodType } from "zod";

type ValidationMap<EnvMap> = {
  [k in keyof EnvMap]: z.Schema<EnvMap[k]>;
};

type BaseEnvMap = {
  [key: string]: unknown;
};

export type EnvString = z.ZodString;

export class Env<EnvMap extends BaseEnvMap> {
  readonly #envMap: EnvMap;

  static readonly string = z.string();
  static readonly number = z.preprocess((value) => {
    /*
     * the preprocess function is needed because all keys in process.env are strings, so
     * schema.parse("123") will result in an error.
     *
     * This litte function is a workaround for that.
     */
    if (typeof value === "string") {
      return Number(value);
    }
  }, z.number());

  static readonly literal = <LiteralType extends string | number | boolean>(
    lit: LiteralType
  ) => {
    return z.literal(lit);
  };

  static readonly default = <Type extends ZodType>(
    type: Type,
    def: z.infer<typeof type>
  ): z.ZodType<z.infer<typeof type>> => {
    return type.default(def);
  };

  private constructor(envMap: EnvMap) {
    this.#envMap = envMap;
  }

  /**
   * Retrieve a value from the `env` schema.
   *
   * @param key - The env variable to retrieve.
   * @returns The value of the env variable with it's correct type.
   */
  get<K extends keyof EnvMap>(key: K): EnvMap[K] {
    return this.#envMap[key];
  }

  /**
   * Define a schema for your `.env` file.
   *
   * All keys in your schema **MUST** be present in the `.env` file, even the defaulted ones.
   *
   * The default keys must be declared in the `.env` file like `FOO=` or `FOO=""`.
   *
   * @param validationMap - A map of keys to schemas.
   * @return A new `Env` instance with the defined schemas.
   */
  static define<EnvMap extends BaseEnvMap>(
    validationMap: ValidationMap<EnvMap>
  ): Env<EnvMap> {
    const map: any = {};
    const keys = Object.keys(validationMap);

    keys.forEach((key) => {
      const schema = validationMap[key];

      /*
       * An env variable can not be missed from the .env file when declared on the schema.
       *
       * If it is declared, but not set, it will be set to an empty string in process.env.
       */
      if (key in process.env || key === "") {
        /*
         * If the env variable is an empty string, it is the same as it would be undefined.
         * In order to obtain the default bahavior from Env.default, we need to pass undefined
         */
        map[key] = schema.parse(process.env[key] || undefined);
      } else {
        throw new Error(`Missing ${key} env variable from process.env`);
      }
    });

    return new Env(map);
  }
}
