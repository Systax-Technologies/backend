import {
  ActiveProductInstance,
  ProductInstance,
  ProductInstanceStatus,
} from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

/**
 * Funtion to find a specific ProductInstance given its ID
 * @param id The ID of the ProductInstance to find
 * @returns `ProductInstance` object if found, otherwise `null`
 */
export const findProductInstance = async (
  id: string
): Promise<ProductInstance | null> => {
  return database.productInstance.findUnique({
    where: { id },
  });
};

export type ProductInstances = (ProductInstance & {
  activeProductInstance: ActiveProductInstance | null;
})[];

export const findManyProductInstances = async (): Promise<ProductInstances> => {
  return database.productInstance.findMany({
    include: {
      activeProductInstance: true,
    },
  });
};

/**
 * Function to create one or more ProductInstances given the Product
 * @param productId ID of the Product
 * @param quantity Quantity of single ProductInstances to create
 * @returns The count of the number of records created
 */
export const createManyProductInstances = async (
  productId: string,
  quantity: number
): Promise<{ count: number }> => {
  return database.productInstance.createMany({
    data: [...Array(quantity)].map((_) => ({ productId })),
  });
};

/**
 * Function to update a single ProductInstance
 * @param id Id of the ProductInstance to update
 * @param data `ProductInstance` object with the new data
 * @returns The new `ProductInstance`
 */
export const updateProductInstance = async (
  id: string,
  data: Omit<ProductInstance, "id">
): Promise<ProductInstance | null> => {
  try {
    return database.productInstance.update({
      where: { id },
      data,
    });
  } catch (_) {
    return null;
  }
};

/**
 * Function to update the Order Id field of one or more ProductInstances, only if the status is `IN_STOCK`.
 * The Status will automatically be updated to `SOLD`
 * @param ids Array of Ids to update
 * @param orderId The Order Id to add
 * @returns The count of the number of records updated
 */
export const updateManyProductInstanceOrders = async (
  ids: string[],
  orderId: string
): Promise<{ count: number }> => {
  return database.productInstance.updateMany({
    where: {
      id: { in: ids },
      status: "IN_STOCK",
    },
    data: {
      orderId,
      status: "SOLD",
    },
  });
};

/**
 * Function to activate a ProductInstance
 * @param customerId id of customer to associate an active ProductInstance
 * @param productInstanceId id of ProductInstance to activate
 * @returns The ProductInstance
 */
export const productInstanceActivation = async (
  customerId: string,
  productInstanceId: string
): Promise<ProductInstance | null> => {
  const result = await database.productInstance.findFirst({
    where: {
      id: productInstanceId,
      status: "SOLD",
    },
  });

  if (result) {
    return database.productInstance.update({
      where: {
        id: productInstanceId,
      },
      data: {
        activeProductInstance: {
          create: {
            customerId,
          },
        },
      },
    });
  } else {
    return null;
  }
};

/**
 * Function to delete a single ProductInstance
 * @param id The Id of the ProductInstance to delete
 * @returns The `ProductInstance` object deleted
 */
export const deleteProductInstance = async (
  id: string
): Promise<ProductInstance | null> => {
  try {
    return database.productInstance.delete({
      where: { id },
    });
  } catch (_) {
    return null;
  }
};

/**
 * Function to count the ProductInstances with the given Status
 * @param status The status to count for
 * @returns The count of the matching records
 */
export const countProductInstancesByStatus = async (
  status: ProductInstanceStatus
): Promise<number | null> => {
  return database.productInstance.count({
    where: { status },
  });
};

/**
 * Function to count the ProductInstances with the given Product
 * @param productId The Id of the Product to count for
 * @returns The count of the matching records
 */
export const countProductInstancesByType = async (
  productId: string
): Promise<number | null> => {
  return database.productInstance.count({ where: { productId } });
};
