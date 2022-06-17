import type { Address, CreditCard, Customer, User } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

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

type CustomerCreateInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  creditCard?: CreditCard;
};

export const createCustomer = async ({
  email,
  password,
  firstName,
  lastName,
  billingAddress,
  shippingAddress,
  creditCard,
}: CustomerCreateInput): Promise<Customer> => {
  return database.customer.create({
    data: {
      billingAddress: { create: billingAddress },
      shippingAddress: { create: shippingAddress },
      creditCard: { create: creditCard },
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

type UpdateCustomerDto = {
  user: Omit<User, "id">;
  billingAddres: Omit<Address, "id">;
  shippingAddress: Omit<Address, "id">;
  creditCard: Omit<CreditCard, "id">;
};

export const updateCustomer = async (
  id: string,
  customer: UpdateCustomerDto
) => {
  return database.customer.update({
    where: { id },
    data: {
      user: {
        update: {
          ...customer.user,
        },
      },
      billingAddress: {
        update: {
          ...customer.billingAddres,
        },
      },
      shippingAddress: {
        update: {
          ...customer.shippingAddress,
        },
      },
      creditCard: {
        update: {
          where: {
            number: customer.creditCard.number,
          },
          data: {
            ...customer.creditCard,
          },
        },
      },
    },
  });
};

export const deleteCustomer = async (id: string) => {
  return database.customer.delete({
    where: { id },
  });
};
