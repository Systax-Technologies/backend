import type { Product } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import type { ProductInput, ProductUpdateInput } from "../dto";

/**
 * Function to find every Product
 * @return The array of every `Product` found
 */
export const findProducts = async (): Promise<Product[]> => {
  return database.product.findMany();
};

/**
 * Function to find a specific Product
 * @param id Id of the Product to find
 * @returns The `Product` found
 */
export const findProduct = async (id: string): Promise<Product | null> => {
  return database.product.findUnique({
    where: { id },
  });
};

/**
 * Function to create a new Product
 * @param data The `Product` object to add
 * @returns The `Product` object created
 */
export const createProduct = async (data: ProductInput): Promise<Product> => {
  return database.product.create({
    data,
  });
};

/**
 * Function to update a Product
 * @param id Id of the Product to update
 * @param data Data for the new Product
 * @returns The new `Product` object created
 */
export const updateProduct = async (
  id: string,
  data: ProductUpdateInput
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
 * Function to delete a Product
 * @param id The Id of the Product to delete
 * @returns The `Product` object deleted
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

export const findProducts = async (): Promise<Product[]> => {
  return database.product.findMany();
};
