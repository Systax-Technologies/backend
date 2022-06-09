import { ProductType } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import { ProductInput } from "./dto/product.input.server";
import { Product } from "./dto/product.server";

export const insertProduct = (product: ProductInput): Promise<Product> => {
  return database.product.create({
    data: product,
  });
};

export const findProduct = (id: string): Promise<Product | null> => {
  return database.product.findUnique({
    where: {
      id,
    },
  });
};

export const findProductsByType = (
  productType: ProductType,
): Promise<Product[]> => {
  return database.product.findMany({
    where: {
      productType: {
        equals: productType,
      },
    },
  });
};

export const findProducts = (): Promise<Product[]> => {
  return database.product.findMany();
};

export const deleteProduct = (id: string): Promise<Product> => {
  return database.product.delete({
    where: {
      id,
    },
  });
};

export const updateProduct = (
  id: string,
  product: ProductInput,
): Promise<Product> => {
  return database.product.update({
    where: {
      id,
    },
    data: product,
  });
};
