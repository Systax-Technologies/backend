import type { Product, ProductStatus } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

/**
 * Funtion to find a specific Product given its ID
 * @param id The ID of the Product to find
 * @returns `Product` object if found, otherwise `null`
 */
export const findProduct = async (id: string): Promise<Product | null> => {
  return database.product.findUnique({
    where: { id },
  });
};

/**
 * Function to create one or more Products given the Product Type
 * @param productTypeId ID of the Product Type
 * @param quantity Quantity of single Products to create
 * @returns The count of the number of records created
 */
export const createManyProduct = async (
  productTypeId: string,
  quantity: number
) => {
  let data = new Array<any>(quantity).fill({ productTypeId });
  return (
    await database.product.createMany({
      data,
    })
  ).count;
};

/**
 * Function to update a single Product
 * @param id Id of the Product to update
 * @param data `Product` object with the new data
 * @returns The new `Product`
 */
export const updateProduct = async (
  id: string,
  data: Product
): Promise<Product | null> => {
  return database.product.update({
    where: { id },
    data,
  });
};

/**
 * Function to update the Order Id field of one or more Products, only if the status is `IN_STOCK`.
 * The Status will automatically be updated to `SOLD`
 * @param ids Array of Ids to update
 * @param orderId The Order Id to add
 * @returns The count of the number of records updated
 */
export const updateManyProductOrder = async (
  ids: string[],
  orderId: string
) => {
  return (
    await database.product.updateMany({
      where: {
        id: { in: ids },
        status: "IN_STOCK",
      },
      data: {
        orderId,
        status: "SOLD",
      },
    })
  ).count;
};

/**
 * Function to delete a single Product
 * @param id The Id of the Product to delete
 * @returns The `Product` object deleted
 */
export const deleteProduct = async (id: string): Promise<Product | null> => {
  return database.product.delete({
    where: { id },
  });
};

/**
 * Function to count the Products with the given Status
 * @param status The status to count for
 * @returns The count of the matching records
 */
export const countProductStatus = async (
  status: ProductStatus
): Promise<number | null> => {
  return database.product.count({
    where: { status },
  });
};

/**
 * Function to count the Products with the given Product Type
 * @param productTypeId The Id of the Product Type to count for
 * @returns The count of the matching records
 */
export const countProductType = async (
  productTypeId: string
): Promise<number | null> => {
  return database.product.count({ where: { productTypeId } });
};
