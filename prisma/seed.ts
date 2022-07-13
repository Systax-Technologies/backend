import { PrismaClient, Role } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getCustomers().map((customer) => {
      return db.customer.create({ data: customer });
    }),
  );

  await Promise.all(
    getEmployees().map((employee) => {
      return db.employee.create({ data: employee });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );
  await Promise.all(
    (
      await getOrders()
    ).map((order) => {
      return db.order.create({ data: order });
    }),
  );
  await Promise.all(
    (
      await getProductInstances()
    ).map((productInstance) => {
      return db.productInstance.create({ data: productInstance });
    }),
  );
  // await Promise.all(
  //   (
  //     await getActiveProductInstances()
  //   ).map((activeProductInstance) => {
  //     return db.activeProductInstance.create({ data: activeProductInstance });
  //   })
  // );
}

seed();

function getCustomers() {
  return [
    {
      id: "cl5ceonfr000009mp8f2pgwvh",
      email: "mariorossi@systax.it",
      password:
        "6e4d54eb30c28f2bd9d93b6c81e499a29fc279a51000ce66c42e8bfcf0d65a9d",
      firstName: "Mario",
      lastName: "Rossi",
    },
    {
      id: "cl5ceoss8000109mp6i1j6e7s",
      email: "lucaverdi@systax.it",
      password:
        "7ca66a519f171456d5ed159002c30b5b5f73f920010289e97048dfd4fa08c83f",
      firstName: "Luca",
      lastName: "Verdi",
    },
    {
      id: "cl5cep5v1000409mphs2pfowu",
      email: "giorgiogialli@systax.it",
      password:
        "428f814c4771007675fad3aa4b92a54b2344adc3b8ecbcc2a1fd288a049dd121",
      firstName: "Giorgio",
      lastName: "Gialli",
    },
    {
      id: "cl5ceprha000509mp2fjr8vs7",
      email: "lombardidiamante@systax.it",
      password:
        "6358e2c2dcc974142c59dad65561b9bd14b6fce40113b70715e6f0a6790206af",
      firstName: "Lombardi",
      lastName: "Diamante",
    },
    {
      id: "cl5ceq1fc000609mp2bvi6y8h",
      email: "gandolfococci@systax.it",
      password:
        "b240b09a047ecd879567bd5ab5014414ae3ed518f2abb779475def05018cedf2",
      firstName: "Gandolfo",
      lastName: "Cocci",
    },
    {
      id: "cl5ceqh8z000709mpcp0m5g75",
      email: "alvisiopisani@systax.it",
      password:
        "75e2e93f13fd11784e9cf6286da825b57ced32ad8d7a150df1fcee99370e1189",
      firstName: "Alvisio",
      lastName: "Pisani",
    },
    {
      id: "cl5ceqwav000809mp3zcjgfjv",
      email: "cristofororomani@systax.it",
      password:
        "f3dd5b2c4951f1e895eaa5177bf1413b6dc4bb3b293d5022ffbb1d2c33b496bd",
      firstName: "Cristoforo",
      lastName: "Romani",
    },
    {
      id: "cl5cevtwe000909mp83p39703",
      email: "albertinotrentini@systax.it",
      password:
        "3e3c1494401d3275ee967f95bc5160ceb54d12c9811f2ef9afa6f7cf77930196",
      firstName: "albertino",
      lastName: "trentini",
    },
  ];
}

function getEmployees() {
  return [
    {
      id: "cl5ceonfr000009mp8f2pgwvh",
      email: "mariorossi@systax.it",
      password:
        "6e4d54eb30c28f2bd9d93b6c81e499a29fc279a51000ce66c42e8bfcf0d65a9d",
      firstName: "Mario",
      lastName: "Rossi",
      role: Role.ADMIN,
    },
    {
      id: "cl5ceoss8000109mp6i1j6e7s",
      email: "lucaverdi@systax.it",
      password:
        "7ca66a519f171456d5ed159002c30b5b5f73f920010289e97048dfd4fa08c83f",
      firstName: "Luca",
      lastName: "Verdi",
      role: Role.ADMIN,
    },
    {
      id: "cl5cep5v1000409mphs2pfowu",
      email: "giorgiogialli@systax.it",
      password:
        "428f814c4771007675fad3aa4b92a54b2344adc3b8ecbcc2a1fd288a049dd121",
      firstName: "Giorgio",
      lastName: "Gialli",
    },
    {
      id: "cl5ceprha000509mp2fjr8vs7",
      email: "lombardidiamante@systax.it",
      password:
        "6358e2c2dcc974142c59dad65561b9bd14b6fce40113b70715e6f0a6790206af",
      firstName: "Lombardi",
      lastName: "Diamante",
    },
    {
      id: "cl5ceq1fc000609mp2bvi6y8h",
      email: "gandolfococci@systax.it",
      password:
        "b240b09a047ecd879567bd5ab5014414ae3ed518f2abb779475def05018cedf2",
      firstName: "Gandolfo",
      lastName: "Cocci",
    },
    {
      id: "cl5ceqh8z000709mpcp0m5g75",
      email: "alvisiopisani@systax.it",
      password:
        "75e2e93f13fd11784e9cf6286da825b57ced32ad8d7a150df1fcee99370e1189",
      firstName: "Alvisio",
      lastName: "Pisani",
    },
    {
      id: "cl5ceqwav000809mp3zcjgfjv",
      email: "cristofororomani@systax.it",
      password:
        "f3dd5b2c4951f1e895eaa5177bf1413b6dc4bb3b293d5022ffbb1d2c33b496bd",
      firstName: "Cristoforo",
      lastName: "Romani",
    },
    {
      id: "cl5cevtwe000909mp83p39703",
      email: "albertinotrentini@systax.it",
      password:
        "3e3c1494401d3275ee967f95bc5160ceb54d12c9811f2ef9afa6f7cf77930196",
      firstName: "Albertino",
      lastName: "Trentini",
    },
  ];
}

function getProducts() {
  return [
    {
      model: "SerenUp 7",
      imageUrl:
        "https://ae01.alicdn.com/kf/S37117a8fe86348c08525bba72d70fb02L/Xiaomi-Mi-Smart-Band-7-AMOLED-schermo-intero-50m-profondit-impermeabile-professionale-Sleep-Track-ricco-quadrante.png_.webp",
      description: "Orologio bello",
      color: "Nero",
      size: "XL",
      price: 150,
    },
    {
      model: "Seren Up 7",
      imageUrl:
        "https://cdn.tgdd.vn/Files/2022/05/23/1434440/xiaomi-mi-band-7-ra-mat-ngay-24-05-2022-nhung-cai-2.jpg",
      description: "Orologio molto bello",
      color: "Bianco",
      size: "XL",
      price: 175,
    },
    {
      model: "Seren Up 5",
      imageUrl:
        "https://www.homecleaner.it/474-large_default/braccialetto-sostitutivo-per-xiaomi-mi-band-5-giallo.jpg",
      description: "Orologio bellissimo",
      color: "Giallo",
      size: "XL",
      price: 75,
    },
    {
      model: "Seren Up 5",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-PNUZzfIck_73iVjC6K1TvVXgoZUtZuJjw&usqp=CAU",
      description: "Orologio bello",
      color: "Blu",
      size: "XL",
      price: 75,
    },
  ];
}

async function getOrders() {
  const customers = await database.customer.findMany();

  const orders: {
    customerId: string;
    shippedAt: Date;
    deliveredAt: Date;
  }[] = [];

  for (const customer of customers) {
    orders.push(
      ...[
        {
          customerId: customer.id,
          shippedAt: new Date(),
          deliveredAt: new Date(),
        },
      ],
    );
  }

  return orders;
}

async function getProductInstances() {
  const products = await database.product.findMany();

  const productInstances: {
    productId: string;
  }[] = [];

  for (const product of products) {
    productInstances.push(
      ...[
        {
          productId: product.id,
        },
      ],
    );
  }
  return productInstances;
}

async function getActiveProductInstances() {
  const customers = await database.customer.findMany();

  const activeProductInstances: {
    customerId: string;
  }[] = [];

  for (const customer of customers) {
    activeProductInstances.push(
      ...[
        {
          customerId: customer.id,
        },
      ],
    );
  }
  return activeProductInstances;
}
