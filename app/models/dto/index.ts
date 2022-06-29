import { Address, CreditCard, OrderStatus, Role } from "@prisma/client";

export type LoginDto = {
  email: string;
  password: string;
};

export type EmployeeCreateInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export type EmployeeUpdateInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export type OrderInput = {
  customerId: string;
};

export type OrderUpdateInput = {
  status: OrderStatus;
  shippedAt: Date | null;
  deliveredAt: Date | null;
};

export type CustomerInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  billingAddress?: Omit<Address, "id">;
  shippingAddress?: Omit<Address, "id">;
  creditCard?: Omit<CreditCard, "id">;
};

export type UpdateCustomerDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type creditCardInput = {
  number: number;
  expMonthDate: number;
  expYearDate: number;
  secretCode: number;
};

export type ProductInput = {
  model: string;
  imageUrl: string;
  description: string;
  color: string;
  size: string;
  price: number;
};

export type ProductUpdateInput = {
  model: string;
  imageUrl: string;
  description: string;
  color: string;
  size: string;
  price: number;
};
