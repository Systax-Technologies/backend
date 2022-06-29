import type {
  ActiveProductInstance,
  ActiveProductInstanceStatus,
} from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

/**
 * Function to find a specific Active Product Instance
 * @param id Id of the Active Product Instance
 * @returns The `ActiveProductInstance` object found
 */
export const findActiveProductInstance = async (
  id: string
): Promise<ActiveProductInstance | null> => {
  return database.activeProductInstance.findUnique({
    where: { id },
  });
};

export const findActiveProductInstancesByStatus = async (
  status: ActiveProductInstanceStatus
): Promise<ActiveProductInstance[]> => {
  return database.activeProductInstance.findMany({
    where: { status },
  });
};

export const findActiveProductInstancesByCustomerId = async (
  customerId: string
): Promise<ActiveProductInstance[]> => {
  return database.activeProductInstance.findMany({
    where: { customerId },
  });
};

/**
 * Function to create a new Active Product Instance. Automatically set the status to `ACTIVE`
 * @param customerId Id of the customer that activated the product instance
 * @returns The `ActiveProductInstance` object created
 */
export const createActiveProductInstance = async (
  customerId: string
): Promise<ActiveProductInstance | null> => {
  return database.activeProductInstance.create({
    data: { customerId },
  });
};

/**
 * Function to update the status of an active product instance
 * @param id Id of the Active Product Instance to update
 * @param status The new `ActiveProductInstanceStatus`
 * @returns The `ActiveProductInstance` updated
 */
export const updateActiveProductInstanceStatus = async (
  id: string,
  status: ActiveProductInstanceStatus
): Promise<ActiveProductInstance | null> => {
  try {
    return database.activeProductInstance.update({
      where: { id },
      data: { status },
    });
  } catch (_) {
    return null;
  }
};

/**
 * Function to delete and Active Product Instance
 * @param id Id of the Active Product Instance to delete
 * @returns The `ActiveProductInstance` object deleted
 */
export const deleteActiveProductInstance = async (
  id: string
): Promise<ActiveProductInstance | null> => {
  try {
    return database.activeProductInstance.delete({
      where: { id },
    });
  } catch (_) {
    return null;
  }
};
