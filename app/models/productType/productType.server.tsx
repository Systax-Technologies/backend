import type { ProductType } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

/**
 * Function to find a specific Product Type
 * @param id Id of the Product Type to find
 * @returns The `ProductType` found
 */
export const findProductType = async (
  id: string
): Promise<ProductType | null> => {
  return database.productType.findUnique({
    where: { id },
  });
};

/**
 * Function to create a new Product Type
 * @param data The `ProductType` object to add
 * @returns The `ProductType` object created
 */
export const createProductType = async (
  data: ProductType
): Promise<ProductType | null> => {
  return database.productType.create({
    data,
  });
};

/**
 * Function to update a Product Type
 * @param id Id of the Product Type to update
 * @param data Data for the new Product Type
 * @returns The new `ProductType` object created
 */
export const updateProductType = async (
  id: string,
  data: Omit<ProductType, "id" | "createdAt" | "updatedAt">
): Promise<ProductType | null> => {
  return database.productType.update({
    where: { id },
    data,
  });
};

/**
 * Function to delete a Product Type
 * @param id The Id of the Product Type to delete
 * @returns The `ProductType` object deleted
 */
export const deleteProductType = async (
  id: string
): Promise<ProductType | null> => {
  return database.productType.delete({
    where: { id },
  });
};
