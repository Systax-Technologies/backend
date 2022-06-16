import type { ProductType } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

export const findProductType = async (
  id: string
): Promise<ProductType | null> => {
  return database.productType.findUnique({
    where: { id },
  });
};

export const createProductType = async (
  data: ProductType
): Promise<ProductType | null> => {
  return database.productType.create({
    data,
  });
};

export const updateProductType = async (
  id: string,
  data: Omit<ProductType, "id" | "createdAt" | "updatedAt">
): Promise<ProductType | null> => {
  return database.productType.update({
    where: { id },
    data,
  });
};

export const deleteProductType = async (
  id: string
): Promise<ProductType | null> => {
  return database.productType.delete({
    where: { id },
  });
};
