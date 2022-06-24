import { createProductType } from "~/models/productType/productType.server";
import { Product, ProductType } from "@prisma/client";

type SearchedImage = {
    url: string,
    description: string
}

const SIZES = [
    "XXS",
    "XS",
    "S",
    "M",
    "L",
    "XL"
];

const COLORS = [
    "black",
    "white",
    "silver",
    "gold"
];

const BRANDS = [
    "Jaeger-LeCoultre",
    "Audemars Piguet",
    "Frédérique Constant",
    "Piaget",
    "Cartier",
    "Harry Winston",
    "Blancpain",
    "Longines",
    "Zenith",
    "Tudor"
];

function createProduct(): ProductType {
    const model = randomElement(BRANDS);
    const color = randomElement(COLORS);
    // Between 1.3e12 and 1.55e12 milliseconds
    const createdAt = Math.floor(Math.random() * 2.5e11 + 1.3e12);
    // Between 1.3e12 and 1.65e12 milliseconds, greater
    // than or equal to the value that createdAt holds
    const updatedAt = Math.floor(Math.random() * 1e11 + createdAt);
    const image = getImage([color, model, "wristwatch"]);
    return <ProductType>({
        model: model,
        imageUrl: image.url,
        description: image.description,
        color: color,
        size: randomElement(SIZES),
        // Between 5€ and 150€
        price: Math.floor(Math.random() * 145 + 5),
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
    });
}

function getImage(searchParams: Array<string>): SearchedImage {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://www.dogpile.com/serp?qc=images&q=" + searchParams.join("+") + "&sc=VUbi6vFM3kKD20", false);
    xmlHttp.send(null);
    let parser = new DOMParser();
    let html = parser.parseFromString(xmlHttp.responseText, "text/html");
    let containers = html.getElementsByClassName("link");
    let chosen = containers[Math.floor(Math.random() * containers.length)];
    return <SearchedImage>({
        url: chosen.firstElementChild?.getAttribute("src"),
        description: searchParams.join(" "),
    });
}

function randomElement<T>(array: Array<T>) {
    return array[Math.floor(Math.random() * SIZES.length)];
}

export function test() {
    for (let i = 0; i < 10; i ++) {
        console.log(createProduct());
    }
}