import { ProductType } from "@prisma/client";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  productType: ProductType;
};
