import type { Product } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import { ProductInput, ProductUpdateInput } from "../dto";

/**
 * Function to find a specific Product Type
 * @param id Id of the Product Type to find
 * @returns The `ProductType` found
 */
export const findProduct = async (id: string): Promise<Product | null> => {
  return database.product.findUnique({
    where: { id },
  });
};

/**
 * Function to create a new Product Type
 * @param data The `ProductType` object to add
 * @returns The `ProductType` object created
 */
export const createProduct = async (
  data: ProductInput,
): Promise<Product | null> => {
  return database.product.create({
    data,
  });
};

/**
 * Function to update a Product Type
 * @param id Id of the Product Type to update
 * @param data Data for the new Product Type
 * @returns The new `ProductType` object created
 */
export const updateProduct = async (
  id: string,
  data: ProductUpdateInput,
): Promise<Product | null> => {
  try {
    return database.product.update({
      where: { id },
      data,
    });
  } catch (_) {
    return null;
  }
};

/**
 * Function to delete a Product Type
 * @param id The Id of the Product Type to delete
 * @returns The `ProductType` object deleted
 */
export const deleteProduct = async (id: string): Promise<Product | null> => {
  try {
    return database.product.delete({
      where: { id },
    });
  } catch (_) {
    return null;
  }
};
