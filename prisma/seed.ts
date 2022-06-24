import { ProductType } from "@prisma/client";

const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

const colors = ["black", "white", "silver", "gold"];

const brands = [
  "Jaeger-LeCoultre",
  "Audemars Piguet",
  "Frédérique Constant",
  "Piaget",
  "Cartier",
  "Harry Winston",
  "Blancpain",
  "Longines",
  "Zenith",
  "Tudor",
];

function createProduct(): Omit<ProductType, "id" | "createdAt" | "updatedAt"> {
  return {
    model: randomElement(brands),
    color: randomElement(colors),
    description: "",
    price: 14.0,
    size: randomElement(sizes),
    imageUrl: "",
  };
}

function randomElement<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * sizes.length)];
}

async function seed() {}
