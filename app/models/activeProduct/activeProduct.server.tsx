import type { ActiveProduct, ActiveProductStatus } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

/**
 * Function to find a specific Active Product
 * @param id Id of the Active Product
 * @returns The `ActiveProduct` object found
 */
export const findActiveProduct = async (
  id: string
): Promise<ActiveProduct | null> => {
  return database.activeProduct.findUnique({
    where: { id },
  });
};

/**
 * Function to create a new Active Product. Automatically set the status to `ACTIVE`
 * @param customerId Id of the customer that activated the product
 * @returns The `ActiveProduct` object created
 */
export const createActiveProduct = async (
  customerId: string
): Promise<ActiveProduct | null> => {
  let data: Omit<ActiveProduct, "id" | "status"> = { customerId };
  return database.activeProduct.create({
    data,
  });
};

/**
 * Function to update the status of an active product
 * @param id Id of the Active Product to update
 * @param status The new `ActiveProductStatus`
 * @returns The `ActiveProduct` updated
 */
export const updateActiveProductStatus = async (
  id: string,
  status: ActiveProductStatus
): Promise<ActiveProduct | null> => {
  return database.activeProduct.update({
    where: { id },
    data: { status },
  });
};

// export const updateActiveProductCustomer

/**
 * Function to delete and Active Product
 * @param id Id of the Active Product to delete
 * @returns The `ActiveProduct` object deleted
 */
export const deleteActiveProduct = async (
  id: string
): Promise<ActiveProduct | null> => {
  return database.activeProduct.delete({
    where: { id },
  });
};
