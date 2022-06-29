import { ActiveProduct, ProductInstance, ProductStatus } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

/**
 * Funtion to find a specific Product given its ID
 * @param id The ID of the Product to find
 * @returns `Product` object if found, otherwise `null`
 */
export const findProductInstance = async (
  id: string,
): Promise<ProductInstance | null> => {
  return database.productInstance.findUnique({
    where: { id },
  });
};

export type ProductInstances = (ProductInstance & {
  activeProduct: ActiveProduct | null;
})[];

export const findManyProductInstances = async (): Promise<ProductInstances> => {
  return database.productInstance.findMany({
    include: {
      activeProduct: true,
    },
  });
};

/**
 * Function to create one or more Products given the Product Type
 * @param productTypeId ID of the Product Type
 * @param quantity Quantity of single Products to create
 * @returns The count of the number of records created
 */
export const createManyProductInstances = async (
  productTypeId: string,
  quantity: number,
): Promise<{ count: number }> => {
  return database.productInstance.createMany({
    data: [...Array(quantity)].map((_) => ({ productTypeId })),
  });
};

/**
 * Function to update a single Product
 * @param id Id of the Product to update
 * @param data `Product` object with the new data
 * @returns The new `Product`
 */
export const updateProductInstance = async (
  id: string,
  data: Omit<ProductInstance, "id">,
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
 * Function to update the Order Id field of one or more Products, only if the status is `IN_STOCK`.
 * The Status will automatically be updated to `SOLD`
 * @param ids Array of Ids to update
 * @param orderId The Order Id to add
 * @returns The count of the number of records updated
 */
export const updateManyProductOrders = async (
  ids: string[],
  orderId: string,
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
 * Function to activate a product
 * @param customerId id of customer to associate an active product
 * @param productId id of product to activate
 * @returns The Product
 */
export const productInstanceActivation = async (
  customerId: string,
  productId: string,
): Promise<ProductInstance | null> => {
  const result = await database.productInstance.findFirst({
    where: {
      id: productId,
      status: "SOLD",
    },
  });

  if (result) {
    return database.productInstance.update({
      where: {
        id: productId,
      },
      data: {
        activeProduct: {
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
 * Function to delete a single Product
 * @param id The Id of the Product to delete
 * @returns The `Product` object deleted
 */
export const deleteProductInstance = async (
  id: string,
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
 * Function to count the Products with the given Status
 * @param status The status to count for
 * @returns The count of the matching records
 */
export const countProductInstancesByStatus = async (
  status: ProductStatus,
): Promise<number | null> => {
  return database.productInstance.count({
    where: { status },
  });
};

/**
 * Function to count the Products with the given Product Type
 * @param productTypeId The Id of the Product Type to count for
 * @returns The count of the matching records
 */
export const countProductInstancesByType = async (
  productTypeId: string,
): Promise<number | null> => {
  return database.productInstance.count({ where: { productTypeId } });
};
