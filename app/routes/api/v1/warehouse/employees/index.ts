import type { Employee } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { findEmployees } from "~/models/employee/employee.server";

type LoaderData = {
  employees: Employee[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const employees = await findEmployees();
  return {
    employees,
  };
};
