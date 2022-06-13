import type { ActiveProduct, ProductStatus } from "@prisma/client";

export type ProductInput = {
    status: ProductStatus;
    productTypeId: string;
}

export type Product = {
    id: string;
    status: ProductStatus;
    activeProduct?: ActiveProduct
    orderId?: string;
    productTypeId: string
}