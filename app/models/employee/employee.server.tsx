import type { Employee, Role } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import type {
  EmployeeCreateInput,
  EmployeeUpdateInput,
  LoginDto,
} from "../dto";

export const findEmployees = async (): Promise<Employee[]> => {
  return database.employee.findMany();
};

export const findEmployeeByLogin = async ({
  email,
  password,
}: LoginDto): Promise<Employee | null> => {
  return database.employee.findFirst({
    where: {
      email,
      password,
    },
  });
};

export const findEmployee = async (id: string): Promise<Employee | null> => {
  return database.employee.findUnique({
    where: {
      id,
    },
  });
};

export const createEmployee = async (
  employeeInput: EmployeeCreateInput,
): Promise<Employee> => {
  return database.employee.create({
    data: {
      ...employeeInput,
    },
  });
};

export const updateEmployee = async (
  id: string,
  employee: EmployeeUpdateInput,
): Promise<Employee | null> => {
  try {
    return database.employee.update({
      where: {
        id,
      },
      data: {
        ...employee,
      },
    });
  } catch (_) {
    return null;
  }
};

export const deleteEmployee = async (id: string): Promise<Employee | null> => {
  try {
    return database.employee.delete({
      where: {
        id,
      },
    });
  } catch (_) {
    return null;
  }
};

export const findEmployeesByRole = async (role: Role): Promise<Employee[]> => {
  return database.employee.findMany({
    where: {
      role,
    },
  });
};
