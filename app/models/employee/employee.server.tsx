import type { Employee, Role } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import type { LoginDto } from "../dto";

export const findEmployees = async () => {
  return database.employee.findMany();
};

export const findEmployeeByLogin = async ({ email, password }: LoginDto) => {
  return database.employee.findFirst({
    where: {
      email,
      password,
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
  });
};

type EmployeeCreateInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export const createEmployee = async (employeeInput: EmployeeCreateInput) => {
  return database.employee.create({
    data: {
      ...employeeInput,
    },
  });
};

export const updateEmployee = async (
  id: string,
  employee: Omit<Employee, "id">
) => {
  return database.employee.update({
    where: {
      id,
    },
    data: {
      ...employee,
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
  });
};

export const findEmployeeByName = async (
  firstName: string,
  lastName: string
) => {
  return database.employee.findMany({
    where: {
      firstName,
      lastName,
    },
  });
};
