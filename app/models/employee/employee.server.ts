import { database } from "~/helpers/db-helper.server";
import { EmployeeInput } from "./dto/employee.input.server";
import { Employee } from "./dto/employee.server";

export const insertEmployee = (employee: EmployeeInput): Promise<Employee> => {
  return database.employee.create({
    data: employee,
  });
};

export const findEemployee = (id: string): Promise<Employee | null> => {
  return database.employee.findUnique({
    where: {
      id,
    },
  });
};

export const findEemployeeByEmail = (
  email: string,
): Promise<Employee | null> => {
  return database.employee.findUnique({
    where: {
      email,
    },
  });
};

export const findEemployeeByLogin = (
  email: string,
  password: string,
): Promise<Employee | null> => {
  return database.employee.findFirst({
    where: {
      email,
      password,
    },
  });
};

export const deleteEmployee = (id: string): Promise<Employee> => {
  return database.employee.delete({
    where: {
      id,
    },
  });
};

export const updateEmployee = (
  id: string,
  employee: EmployeeInput,
): Promise<Employee> => {
  return database.employee.update({
    where: {
      id,
    },
    data: employee,
  });
};

export const findEemployees = (): Promise<Employee[]> => {
  return database.employee.findMany();
};
