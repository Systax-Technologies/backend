# project work <!-- omit in toc -->

- [backend](#backend)
- [dev database](#start-dev-database-server)
- [prisma studio](#prisma-studio)
- [api docs](#api-docs)

## backend <!-- omit in toc -->

This repo contains a [Remix.run](https://remix.run) project with a [Postgresql](https://postgresql.org) database queried with [Prisma.io](https://prisma.io).

The backend also exposes API routes in the [/api/v1](./app/routes/api/v1/) folder.

All requests to the API routes, except for the `/api/v1/.../login` API route , **must** have the `authorization` header set with the token in the form:

```ts
const headers = {
  authorization: `Bearer <jwt>`,
};
```

All API routes accept only `application/json` as `Content-Type` in body request and return `application/json` as `Content-Type` in response body.

> ⚠️ please note that the `null` value could possibly be returned as body response of a 200 or 204 response

### start dev database server <!-- omit in toc -->

A `docker-compose.yaml` file can be found in the project that starts a `postgresql` server.

Setup your `.env` file like the `.env.example`.

In order to start the dev database server, run:

> ⚠️ please note that we use the latest version of Docker that already has compose, not `docker-compose`

```sh
$ npm run dev:docker
```

To stop the database server run `npm run dev:docker:stop`.

### make changes to database <!-- omit in toc -->

The prisma model for the database can be found [here](./prisma/schema.prisma).

Once a change is made, run:

```sh
$ npm run db:push
```

This will overwrite all existings data in your database, and setup a new library.

The connection to the database is handled by [this](./app/helpers/db-helper.server.ts) helper, for example:

```ts
import { database } from "~/helpers/db-helper.server";

database.user.create({
  data: {
    firstName: "Saul",
    lastName: "Goodman",
  },
});
```

> ℹ️ Migrations are work in progress

### prisma studio <!-- omit in toc -->

A great utility is the `prisma studio` package that should be already installed.

In order to run the `prisma studio` utility, run:

- Linux/MacOS

  ```sh
  $ npm run dev:prisma
  ```

- Windows

  ```sh
  $ DATABASE_URL="postresql://<user>:<password>@<host>:<port>/<db>" npx prisma studio
  ```

# API docs <!-- omit in toc -->

- [Warehouse](#warehouse)
  - [POST `/api/v1/warehouse/login`](#post-apiv1warehouselogin)
  - [GET `/api/v1/warehouse/products`](#get-apiv1warehouseproducts)
  - [POST `/api/v1/warehouse/products`](#post-apiv1warehouseproducts)
  - [PATCH `/api/v1/warehouse/products`](#patch-apiv1warehouseproducts)
  - [DELETE `/api/v1/warehouse/products`](#delete-apiv1warehouseproducts)
  - [GET `/api/v1/warehouse/employees`](#get-apiv1warehouseemployees)
  - [GET `/api/v1/warehouse/employees/employee`](#get-apiv1warehouseemployeesemployee)
  - [POST `/api/v1/warehouse/employees/employee`](#post-apiv1warehouseemployeesemployee)
- [Ecommerce](#ecommerce)
  - [POST `/api/v1/ecommerce/login`](#post-apiv1ecommercelogin)

---

## Warehouse

### POST `/api/v1/warehouse/login`

Generate a vaild access token for the requested user

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "example@example.com",
  "password": "ED928470A9D684C0EE566BD84C7449FE6C03413F3BB61F527F04473B38F4EFD0"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
|          `404` Not found | User not found                      |
| `405` Method Not Allowed | The request method is not `POST`    |

---

### GET `/api/v1/warehouse/products`

Retrieve the complete list od products.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Return: <!-- omit in toc -->

```json
{
  "products": [
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD" | "IN_STOCK",
    "orderId": "c00p6qup20000ckkzslahp5pn" | null,
    "productTypeId": "cl4rb193000002a66jmw17ri3",
    "activeProduct": {
      "id": "cl4rb2pdh00012a6640drwif0",
      "status": "ACTIVE" | "REMOVED"| "DAMAGED",
      "customerId": "cl4rb3wvv00032a66audt0pbp"
    } | null
  ]
}
```

---

### POST `/api/v1/warehouse/products`

Create a number of new products given the quantity and the type of product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "productTypeId": "cl4rb193000002a66jmw17ri3",
  "quantity": 3
}
```

> **Constraints:**
>
> - The field `quantity` must be greater than `0`

#### Return: <!-- omit in toc -->

```json
{
  "numberOfCreatedProducts": 3
}
```

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `POST`    |

---

### PATCH `/api/v1/warehouse/products`

Update the field of a specific product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD" | "IN_STOCK",
    "orderId": "c00p6qup20000ckkzslahp5pn" | null,
    "productTypeId": "cl4rb193000002a66jmw17ri3",
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product to update

#### Return: <!-- omit in toc -->

```json
{
  "product": {
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD" | "IN_STOCK",
    "orderId": "c00p6qup20000ckkzslahp5pn" | null,
    "productTypeId": "cl4rb193000002a66jmw17ri3",
  }
}
```

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `PATCH`   |

---

### DELETE `/api/v1/warehouse/products`

Delete a specific product record and its related active product record (if present)

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "ch72gsb320000udocl363eofy"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "product": {
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD" | "IN_STOCK",
    "orderId": "c00p6qup20000ckkzslahp5pn" | null,
    "productTypeId": "cl4rb193000002a66jmw17ri3",
  }
}
```

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `METHOD`  |

---

### GET `/api/v1/warehouse/employees`

Get the list of all the employees

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Return: <!-- omit in toc -->

```json
{
  "employees": [
    {
      "id":"ch72gsb320000udocl363eofy",
      "email":"example@example.com",
      "password":"988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
      "createdAt":"01-01-1970-00:00:00",
      "updatedAt":"01-01-1970-00:00:00",
      "firstName":"John",
      "lastName":"Doe",
      "role":"ADMIN" | "WORKER"
    },
    ...
  ]
}
```

---

### GET `/api/v1/warehouse/employees/employee`

_TODO_

### POST `/api/v1/warehouse/employees/employee`

Create a new employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email":"example@example.com",
  "password":"988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
  "firstName":"John",
  "lastName":"Doe",
  "role":"ADMIN" | "WORKER"
}
```

> **Constraints:**
>
> - `email` must have a valid email address syntax
> - `password` must be already hashed

#### Return: <!-- omit in toc -->

```json
{
  "employee": {
      "id":"ch72gsb320000udocl363eofy",
      "email":"example@example.com",
      "password":"988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
      "createdAt":"01-01-1970-00:00:00",
      "updatedAt":"01-01-1970-00:00:00",
      "firstName":"John",
      "lastName":"Doe",
      "role":"ADMIN" | "WORKER"
  }
}
```

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `POST`    |

---

---

## Ecommerce

### POST `/api/v1/ecommerce/login`

Generate a vaild access token for the requested user

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "example@example.com",
  "password": "ED928470A9D684C0EE566BD84C7449FE6C03413F3BB61F527F04473B38F4EFD0"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
|          `404` Not found | User not found                      |
| `405` Method Not Allowed | The request method is not `POST`    |

---
