import { prisma } from "@prisma/client";
import type { Product } from "./product-dto.server";

export const findProductById = (id:string): Promise<Product | null> => {
    return prisma.product.findUnique({
        where: {
            id,
        },
    });
};