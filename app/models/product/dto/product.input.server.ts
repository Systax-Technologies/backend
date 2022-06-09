import { ProductType } from "@prisma/client";

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  productType: ProductType;
};
