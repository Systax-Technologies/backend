import type { User } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

export const findUserByLogin = async (
  email: string,
  password: string
): Promise<User | null> => {
  return database.user.findFirst({
    where: {
      email,
      password,
    },
  });
};

export const findUser = async (id: string): Promise<User | null> => {
  return database.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User | null> => {
  const data: Omit<User, "id" | "createdAt" | "updatedAt"> = {
    email,
    password,
    firstName,
    lastName,
  };
  return database.user.create({
    data,
  });
};
