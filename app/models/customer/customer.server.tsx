import type { ActiveProductInstanceStatus, Customer } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import type {
  creditCardInput,
  CustomerInput,
  LoginDto,
  UpdateCustomerDto,
} from "../dto";

/**
 * Function to find a specific Customer
 * @param id Id of the Customer
 * @returns The `Customer` object found or null
 */
export const findCustomer = async (id: string): Promise<Customer | null> => {
  return database.customer.findUnique({
    where: { id },
  });
};

export const findCustomers = async (): Promise<Customer[]> => {
  return database.customer.findMany();
};

export const findCustomerByLogin = async ({
  email,
  password,
}: LoginDto): Promise<Customer | null> => {
  return database.customer.findFirst({
    where: {
      email,
      password,
    },
  });
};

export const createCustomer = async ({
  billingAddress,
  shippingAddress,
  creditCard,
  ...data
}: CustomerInput): Promise<Customer> => {
  return database.customer.create({
    data: {
      billingAddress: { create: billingAddress },
      shippingAddress: { create: shippingAddress },
      creditCard: { create: creditCard },
      ...data,
    },
  });
};

export const updateCustomer = async (id: string, data: UpdateCustomerDto) => {
  return database.customer.update({
    where: { id },
    data,
  });
};

export const createCustomerCreditCard = async (
  customerId: string,
  data: creditCardInput,
) => {
  return database.creditCard.create({
    data: {
      ...data,
      customer: {
        connect: {
          id: customerId,
        },
      },
    },
  });
};

export const deleteCustomer = async (id: string): Promise<Customer | null> => {
  try {
    return database.customer.delete({
      where: { id },
    });
  } catch (_) {
    return null;
  }
};

type CustomerActiveProduct = {
  status: ActiveProductInstanceStatus;
  id: string;
  model: string;
};

export const findCustomerActiveProducts = async (
  customerId: string,
): Promise<CustomerActiveProduct[] | null> => {
  const activeProducts = await database.activeProductInstance.findMany({
    where: { customerId: { equals: customerId } },
    select: {
      id: true,
      status: true,
      productInstance: {
        select: {},
        include: {
          product: {
            select: {
              model: true,
            },
          },
        },
      },
    },
  });

  if (activeProducts.length === 0) {
    return null;
  }

  return activeProducts.map((product) => {
    return {
      status: product.status,
      id: product.id,
      model: product.productInstance.product.model,
    };
  });
};
