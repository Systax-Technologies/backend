# project work

- [api docs](#api-docs)

## backend

This repo contains a [Remix.run](https://remix.run) project with a [Postgresql](https://postgresql.org) database queried with [Prisma.io](https://prisma.io).

The backend also exposes API routes in the [/api](./app/routes/api) folder.

All requests to the API routes, except for the `/login` API route , **must** have the `authorization` header set with the token in the form:

```ts
const headers = {
  authorization: `Bearer <jwt>`,
};
```

All API routes accept only `application/json` as `Content-Type` in body request and return `application/json` as `Content-Type` in response body.

> ⚠️ please note that the `null` value could possibly be returned as body response of a 200 or 204 response

### start dev database server

A `docker-compose.yaml` file can be found in the project that starts a `postgresql` server.

Setup your `.env` file like the `.env.example`.

In order to start the dev database server, run:

> ⚠️ please note that we use the latest version of Docker that already has compose, not `docker-compose`

```sh
$ npm run dev:docker
```

To stop the database server run `npm run dev:docker:stop`.

### make changes to database

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

### prisma studio

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

# API docs

- [warehouse APIs](#warehouse)
- [ecommerce APIs](#ecommerce)

## warehouse

- `/api/v1/warehouse/login`

Accepts only a `POST` request with `Content-Type: application/json` and a body formatted as:

```json
{
  "email": "greghouse@princeton.com",
  "password": "ED928470A9D684C0EE566BD84C7449FE6C03413F3BB61F527F04473B38F4EFD0"
}
```

The route will return a `Content-Type: application/json` formatted as:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

- `/api/v1/warehouse/products`

Accepts a `GET` request, a `POST` request and a `PATCH` request.

#### GET

Accepts a `GET` request.

The route will return a `Content-Type: application/json` and a body formatted as:

```ts
{
  activeProducts: Products
}
```

Where:

```ts
type Products = {
  id: string,
  status: ProductStatus,
  orderId: string | null,
  productTypeId: string,
  activeProduct: ActiveProduct | null
}[]

type ProductStatus = "IN_STOCK" | "SOLD";

type ActiveProduct = {
  id: string,
  status: ActiveProductStatus,
  customerId: string
}

type ActiveProductStatus = "ACTIVE" | "REMOVED" | "DAMAGED"
```

#### POST

Accepts a `POST` request with `Content-Type: application/json` and a body formatted as:

```json
{
  "productTypeId": "1234-5678-9012",
  "quantity": 3
}
```

Where **quantity >= 1**

The route will return a `Content-Type: application/json` and a body formatted as:

```json
{
  "numberOfCreatedProducts": 3
}
```

#### PATCH

Accepts a `PATCH` request with `Content-Type: application/json` and a body formatted as:

```json
{
  "id": "",
  "status": "",
  "productTypeId": "",
  "orderId": "",
}
```

Where `status: "IN_STOCK" | "SOLD"` and `orderId = null if status == "IN_STOCK"`

## ecommerce

- `/api/v1/ecommerce/login`

Accepts only a `POST` request with `Content-Type: application/json` and a body formatted as:

```json
{
  "email": "greghouse@princeton.com",
  "password": "ED928470A9D684C0EE566BD84C7449FE6C03413F3BB61F527F04473B38F4EFD0"
}
```

The route will return a `Content-Type: application/json` formatted as:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
>>>>>>> Stashed changes
