import { PrismaClient, Role } from "@prisma/client";

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
    getProduct().map((product) => {
      return db.product.create({ data: product });
    }),
  );
}

seed();

function getCustomers() {
  return [
    {
      email: "mariorossi@systax.it",
      password:
        "59195c6c541c8307f1da2d1e768d6f2280c984df217ad5f4c64c3542b04111a4",
      firstName: "Mario",
      lastName: "Rossi",
    },
    {
      email: "lucaverdi@systax.it",
      password:
        "d70f47790f689414789eeff231703429c7f88a10210775906460edbf38589d90",
      firstName: "Luca",
      lastName: "Verdi",
    },
    {
      email: "giorgiogialli@systax.it",
      password:
        "8a2e7ca933fb2f760a71226f9f861b6776ab86bf50321193832afb3dbb42de6a",
      firstName: "Giorgio",
      lastName: "Gialli",
    },
    {
      email: "lombardidiamante@systax.it",
      password:
        "2f5fdf5963abd2053b6a2a6bc364fd28eb1b56a488ff73967a7e637b66d912f0",
      firstName: "Lombardi",
      lastName: "Diamante",
    },
    {
      email: "gandolfococci@systax.it",
      password:
        "6e50f674dbf9d866ba814f866f38790645b6e35a9430cf8eeceadcb0c0a20575",
      firstName: "Gandolfo",
      lastName: "Cocci",
    },
    {
      email: "alvisiopisani@systax.it",
      password:
        "eff427210e0db6efb34c72689c9336f6978fc3e01a4e3157c5b67afcdc905f23",
      firstName: "Alvisio",
      lastName: "Pisani",
    },
  ];
}

function getEmployees() {
  return [
    {
      email: "mariorossi@systax.it",
      password:
        "59195c6c541c8307f1da2d1e768d6f2280c984df217ad5f4c64c3542b04111a4",
      firstName: "Mario",
      lastName: "Rossi",
      role: Role.ADMIN,
    },
    {
      email: "lucaverdi@systax.it",
      password:
        "d70f47790f689414789eeff231703429c7f88a10210775906460edbf38589d90",
      firstName: "Luca",
      lastName: "Verdi",
      role: Role.ADMIN,
    },
    {
      email: "giorgiogialli@systax.it",
      password:
        "8a2e7ca933fb2f760a71226f9f861b6776ab86bf50321193832afb3dbb42de6a",
      firstName: "Giorgio",
      lastName: "Gialli",
    },
    {
      email: "lombardidiamante@systax.it",
      password:
        "2f5fdf5963abd2053b6a2a6bc364fd28eb1b56a488ff73967a7e637b66d912f0",
      firstName: "Lombardi",
      lastName: "Diamante",
    },
    {
      email: "gandolfococci@systax.it",
      password:
        "6e50f674dbf9d866ba814f866f38790645b6e35a9430cf8eeceadcb0c0a20575",
      firstName: "Gandolfo",
      lastName: "Cocci",
    },
    {
      email: "alvisiopisani@systax.it",
      password:
        "eff427210e0db6efb34c72689c9336f6978fc3e01a4e3157c5b67afcdc905f23",
      firstName: "Alvisio",
      lastName: "Pisani",
    },
  ];
}

function getProduct() {
  return [
    {
      model: "SerenUp 7",
      imageUrl:
        "https://ae01.alicdn.com/kf/S37117a8fe86348c08525bba72d70fb02L/Xiaomi-Mi-Smart-Band-7-AMOLED-schermo-intero-50m-profondit-impermeabile-professionale-Sleep-Track-ricco-quadrante.png_.webp",
      description: "Orologio bello",
      color: "Nero",
      size: "",
      price: 150,
    },
    {
      model: "Seren Up 7",
      imageUrl:
        "https://cdn.tgdd.vn/Files/2022/05/23/1434440/xiaomi-mi-band-7-ra-mat-ngay-24-05-2022-nhung-cai-2.jpg",
      description: "Orologio molto bello",
      color: "Bianco",
      size: "",
      price: 175,
    },
    {
      model: "Seren Up 5",
      imageUrl:
        "https://www.homecleaner.it/474-large_default/braccialetto-sostitutivo-per-xiaomi-mi-band-5-giallo.jpg",
      description: "Orologio bellissimo",
      color: "Giallo",
      size: "",
      price: 75,
    },
    {
      model: "Seren Up 5",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-PNUZzfIck_73iVjC6K1TvVXgoZUtZuJjw&usqp=CAU",
      description: "Orologio bello",
      color: "Blu",
      size: "",
      price: 75,
    },
  ];
}
