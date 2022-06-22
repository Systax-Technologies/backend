import { Employee, Role, User } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

export const findEmployees = async () => {
  return database.employee.findMany({
    include: {
      user: true,
    },
  });
};

export const findEmployeeById = async (
  id: string
): Promise<Employee | null> => {
  return database.employee.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

type EmployeeCreateInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export const createEmployee = async ({
  email,
  password,
  firstName,
  lastName,
  role,
}: EmployeeCreateInput) => {
  return database.employee.create({
    data: {
      role,
      user: {
        create: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    },
  });
};

export const updateEmployee = async (
  id: string,
  employee: Omit<User, "id">
) => {
  return database.employee.update({
    where: {
      id,
    },
    data: {
      user: {
        update: {
          ...employee,
        },
      },
    },
  });
};

export const deleteEmployee = async (id: string) => {
  return database.employee.delete({
    where: {
      id,
    },
  });
};

export const findEmployeeByRole = async (role: Role) => {
  return database.employee.findMany({
    where: {
      role,
    },
    include: {
      user: true,
    },
  });
};

export const findEmployeeByName = async (
  firstName: string,
  lastName: string
) => {
  return database.employee.findMany({
    where: {
      user: {
        firstName,
        lastName,
      },
    },
  });
};