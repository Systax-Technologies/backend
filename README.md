# project work <!-- omit in toc -->

- [backend](#backend)
- [dev database](#start-dev-database-server)
- [prisma studio](#prisma-studio)
- [api docs](#api-docs)

## backend <!-- omit in toc -->

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=remix,postgres,prisma,docker,github" />
  </a>
</p>

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
  - [Login](#login)
    - [POST `/api/v1/warehouse/login`](#post-apiv1warehouselogin)
  - [Product](#producttype)
    - [POST `/api/v1/warehouse/products`](#post-apiv1warehouseproducts)
    - [GET `/api/v1/warehouse/products/{product-id}`](#get-apiv1warehouseproductsproduct-id)
    - [PATCH `/api/v1/warehouse/products/{product-id}`](#patch-apiv1warehouseproductsproduct-id)
    - [DELETE `/api/v1/warehouse/products/{product-id}`](#delete-apiv1warehouseproductsproduct-id)
  - [ProductInstance](#productinstance)
    - [GET `/api/v1/warehouse/productInstances`](#get-apiv1warehouseproductinstances)
    - [POST `/api/v1/warehouse/productInstances`](#post-apiv1warehouseproductinstances)
    - [PATCH `/api/v1/warehouse/productInstances`](#patch-apiv1warehouseproductinstances)
    - [DELETE `/api/v1/warehouse/productInstances`](#delete-apiv1warehouseproductinstances)
  - [Order](#order)
    - [GET `/api/v1/warehouse/orders`](#get-apiv1warehouseorders)
    - [GET `/api/v1/warehouse/orders/{id}`](#get-apiv1warehouseordersid)
    - [GET `/api/v1/warehouse/customers/{customer-id}/orders`](#get-apiv1warehousecustomerscustomer-idorders)
    - [POST `/api/v1/warehouse/orders/by-id/`](#post-apiv1warehouseordersby-id)
    - [PATCH `/api/v1/warehouse/orders/by-id/`](#patch-apiv1warehouseordersby-id)
    - [DELETE `/api/v1/warehouse/orders/by-id/`](#delete-apiv1warehouseordersby-id)
    - [GET `/api/v1/warehouse/orders/by-status/{status}`](#get-apiv1warehouseordersby-statusstatus)
    - [POST `/api/v1/warehouse/orders/dates/within-ordered`](#post-apiv1warehouseordersdateswithin-ordered)
    - [POST `/api/v1/warehouse/orders/dates/within-shipped`](#post-apiv1warehouseordersdateswithin-shipped)
    - [POST `/api/v1/warehouse/orders/dates/within-delivered`](#post-apiv1warehouseordersdateswithin-delivered)
  - [Employee](#employee)
    - [GET `/api/v1/warehouse/employees`](#get-apiv1warehouseemployees)
    - [GET `/api/v1/warehouse/employees/employee`](#get-apiv1warehouseemployeesemployee)
    - [POST `/api/v1/warehouse/employees/employee`](#post-apiv1warehouseemployeesemployee)
    - [PATCH `/api/v1/warehouse/employees/employee`](#patch-apiv1warehouseemployeesemployee)
    - [DELETE `/api/v1/warehouse/employees/employee`](#delete-apiv1warehouseemployeesemployee)
    - [POST `/api/v1/warehouse/employees/employee/name`](#post-apiv1warehouseemployeesemployeename)
    - [GET `/api/v1/warehouse/employees/role/{role}`](#get-apiv1warehouseemployeesrolerole)
- [Ecommerce](#ecommerce)
  - [Login](#login-1)
    - [POST `/api/v1/ecommerce/login`](#post-apiv1ecommercelogin)

---

## Warehouse

## Login

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

> **Constraints:**
>
> - `email` must have a valid email address syntax
> - `password` must be already hashed

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

## Product

### POST `/api/v1/warehouse/products`

Create a new product given the necessary parameters.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "model": "Watch",
  "imageUrl": "/path/to/image",
  "description": "A cool watch",
  "color": "Blue",
  "size": "Adult",
  "price": 199.99
}
```

> **Constraints:**
>
> - `price` must be greater than `0`

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "model": "Watch",
  "imageUrl": "/path/to/image",
  "description": "A cool watch",
  "color": "Blue",
  "size": "Adult",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-29T14:11:24.664Z",
  "productInstances": {}
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product to update
> - `price` must be greater than `0`
> - `productInstances` can be empty

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `POST`    |

---

### GET `/api/v1/warehouse/products/{product-id}`

Retrieve the product with the specified product id.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - `id` must be a valid cuid and must be present in the `Product` Model

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "model": "Watch",
  "imageUrl": "/path/to/image",
  "description": "A cool watch",
  "color": "Blue",
  "size": "Adult",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-29T14:11:24.664Z",
  "productInstances": {}
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product to update
> - `price` must be greater than `0`
> - `productInstances` can be empty

#### Possible errors: <!-- omit in toc -->

|    Error code | Description                    |
| ------------: | :----------------------------- |
| 404 Not Found | The id provided does not exist |

---

### PATCH `/api/v1/warehouse/products/{product-id}`

Update the fields of a specific product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - `id` must be a valid cuid and must be present in the `Product` Model

#### Required Body: <!-- omit in toc -->

```json
{
  "model": "Watch",
  "imageUrl": "/path/to/image",
  "description": "A cool watch",
  "color": "Black",
  "size": "Adult",
  "price": 189.99
}
```

> **Constraints:**
>
> - `price` must be greater than `0`

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "model": "Watch",
  "imageUrl": "/path/to/image",
  "description": "A cool watch",
  "color": "Black",
  "size": "Adult",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-30T15:02:55.335Z",
  "productInstances": {}
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product to update
> - `price` must be greater than `0`
> - `productInstances` can be empty

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                   |
| ---------------------: | :-------------------------------------------- |
|        400 Bad Request | The request body content is invalid           |
|          404 Not Found | The id provided does not exist                |
| 405 Method Not Allowed | The request method is not `PATCH` or `DELETE` |

---

### DELETE `/api/v1/warehouse/products/{product-id}`

Delete a specific product record

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - `id` must be a valid cuid and must be present in the `Product` Model

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "model": "Watch",
  "imageUrl": "/path/to/image",
  "description": "A cool watch",
  "color": "Black",
  "size": "Adult",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-30T15:02:55.335Z",
  "productInstances": {}
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product to update
> - `price` must be greater than `0`
> - `productInstances` can be empty

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                   |
| ---------------------: | :-------------------------------------------- |
|          404 Not Found | The id provided does not exist                |
| 405 Method Not Allowed | The request method is not `PATCH` or `DELETE` |

---

## ProductInstance

### GET `/api/v1/warehouse/productInstances`

Retrieve the complete list of product instances.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Return: <!-- omit in toc -->

```json
{
  "productInstances": [
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD",
    "orderId": "c00p6qup20000ckkzslahp5pn",
    "productId": "cl4rb193000002a66jmw17ri3",
    "activeProductInstance": {
      "id": "cl4rb2pdh00012a6640drwif0",
      "status": "ACTIVE",
      "customerId": "cl4rb3wvv00032a66audt0pbp"
    }
  ]
}
```

> **Constraints:**
>
> - All the id fields must be a valid cuid
> - `status` accepts only "SOLD" and "IN_STOCK" as valid values
> - `orderId` can be `null`
> - `status` under `activeProductInstance` accepts only "ACTIVE", "REMOVED" or "DAMAGED" as valid values
> - `activeProductInstance` can be `null`

---

### POST `/api/v1/warehouse/productInstances`

Create a number of new product instances given the quantity and the type of product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "productId": "cl4rb193000002a66jmw17ri3",
  "quantity": 3
}
```

> **Constraints:**
>
> - `productId` must be a valid cuid
> - `quantity` must be greater than `0`

#### Return: <!-- omit in toc -->

```json
{
  "numberOfCreatedProductInstances": 3
}
```

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `POST`    |

---

### PATCH `/api/v1/warehouse/productInstances`

Update the fields of a specific product instance

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "ch72gsb320000udocl363eofy",
  "status": "SOLD",
  "orderId": "c00p6qup20000ckkzslahp5pn",
  "productId": "cl4rb193000002a66jmw17ri3"
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product instance to update
> - All the id fields must be a valid cuid
> - `status` accepts only "SOLD" and "IN_STOCK" as valid values
> - `orderId` can be `null`

#### Return: <!-- omit in toc -->

```json
{
  "productInstance": {
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD",
    "orderId": "c00p6qup20000ckkzslahp5pn",
    "productId": "cl4rb193000002a66jmw17ri3"
  }
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product instance to update
> - All the id fields must be a valid cuid
> - `status` accepts only "SOLD" and "IN_STOCK" as valid values
> - `orderId` can be `null`

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `PATCH`   |

---

### DELETE `/api/v1/warehouse/productInstances`

Delete a specific product instance record and its related active product instance record (if present)

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

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product instance to update, and must be a valid cuid

#### Return: <!-- omit in toc -->

```json
{
  "productInstance": {
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD",
    "orderId": "c00p6qup20000ckkzslahp5pn",
    "productId": "cl4rb193000002a66jmw17ri3"
  }
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the product instance to update
> - All the id fields must be a valid cuid
> - `status` accepts only "SOLD" and "IN_STOCK" as valid values
> - `orderId` can be `null`

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `METHOD`  |

---

### GET `/api/v1/warehouse/orders`

Retrieves the complete list of orders.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "2022-06-23T08:32:15.028Z",
    "shippedAt": "2022-06-23T08:32:15.028Z",
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
  ]
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

---

### GET `/api/v1/warehouse/orders/{id}`

Retrieves a single order.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - `id` must be a valid cuid and must be present in the `Order` Model

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4qrncms0334tcjj75gn06tv",
  "status": "ORDERED",
  "orderedAt": "2022-06-23T08:32:15.028Z",
  "shippedAt": null,
  "deliveredAt": null,
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

---

### GET `/api/v1/warehouse/customers/{customer-id}/orders`

Retrieves the list of orders of a specified customer.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - The customer id must be a valid cuid and must be present in the `Customer` Model

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "2022-06-23T08:32:15.028Z",
    "shippedAt": "2022-06-23T08:32:15.028Z",
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
  ]
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

---

### POST `/api/v1/warehouse/orders/by-id/`

Creates an order given the id of the customer associated to it

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

> **Constraints:**
>
> - `customerId` must be a valid cuid and must exist in the `Customer` Model

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4vfbh0u00009xjjvk2btxym",
  "status": "ORDERED",
  "orderedAt": "2022-06-26T14:45:56.334Z",
  "shippedAt": null,
  "deliveredAt": null,
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                                      |
| ---------------------: | :--------------------------------------------------------------- |
|        400 Bad Request | The `customerId` provided does not exist in the `Customer` Model |
| 405 Method Not Allowed | The request method is not `POST`, `PATCH` or `DELETE`            |

---

### PATCH `/api/v1/warehouse/orders/by-id/`

Updates an order given the id the order

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "cl4vjlqfi0015x7jjjwxj5vyk",
  "status": "SHIPPED",
  "shippedAt": "2022-06-27T11:31:40.585Z",
  "deliveredAt": null
}
```

> **Constraints:**
>
> - `id` must be a valid cuid and must be present in the `Order` Model
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt`, `deliveredAt` can be `null` or must be a valid date

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4vfbh0u00009xjjvk2btxym",
  "status": "ORDERED",
  "orderedAt": "2022-06-26T14:45:56.334Z",
  "shippedAt": "2022-06-27T11:31:40.585Z",
  "deliveredAt": null,
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                           |
| ---------------------: | :---------------------------------------------------- |
|        400 Bad Request | The `id` provided does not exist in the `Order` Model |
| 405 Method Not Allowed | The request method is not `POST`, `PATCH` or `DELETE` |

---

### DELETE `/api/v1/warehouse/orders/by-id/`

Deletes an order given the id of the order

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "cl4vjlqfi0015x7jjjwxj5vyk"
}
```

> **Constraints:**
>
> - `id` must be a valid cuid and must be present in the `Order` Model

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4vfbh0u00009xjjvk2btxym",
  "status": "ORDERED",
  "orderedAt": "2022-06-26T14:45:56.334Z",
  "shippedAt": "2022-06-27T11:31:40.585Z",
  "deliveredAt": null,
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                           |
| ---------------------: | :---------------------------------------------------- |
|        400 Bad Request | The `id` provided does not exist in the `Order` Model |
| 405 Method Not Allowed | The request method is not `POST`, `PATCH` or `DELETE` |

---

### GET `/api/v1/warehouse/orders/by-status/{status}`

Retrieves the list of orders with the specified status.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "<provided status>",
    "orderedAt": "2022-06-26T08:32:15.028Z",
    "shippedAt": "2022-06-28T08:32:15.028Z",
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
  ]
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                |
| ---------------------: | :----------------------------------------- |
|        400 Bad Request | The `status` provided is not a valid value |
| 405 Method Not Allowed | The request method is not `GET`            |

---

### POST `/api/v1/warehouse/orders/dates/within-ordered`

Retrieves a list of orders within the two order dates specified

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "startDate": "2022-06-25T09:03:40.585Z",
  "endDate": "2022-06-26T17:03:40.585Z"
}
```

> **Constraints:**
>
> - `startDate` and `endDate` must be valid date formats

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "2022-06-26T08:32:15.028Z",
    "shippedAt": "2022-06-28T08:32:15.028Z",
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
  ]
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                                                 |
| ---------------------: | :-------------------------------------------------------------------------- |
|        400 Bad Request | The `startDate` and/or `endDate` fields provided are not valid date formats |
| 405 Method Not Allowed | The request method is not `POST`                                            |

---

### POST `/api/v1/warehouse/orders/dates/within-shipped`

Retrieves a list of orders within the two shipping dates specified

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "startDate": "2022-06-27T09:03:40.585Z",
  "endDate": "2022-06-28T17:03:40.585Z"
}
```

> **Constraints:**
>
> - `startDate` and `endDate` must be valid date formats

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "SHIPPED",
    "orderedAt": "2022-06-26T08:32:15.028Z",
    "shippedAt": "2022-06-28T08:32:15.028Z",
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
  ]
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                                                 |
| ---------------------: | :-------------------------------------------------------------------------- |
|        400 Bad Request | The `startDate` and/or `endDate` fields provided are not valid date formats |
| 405 Method Not Allowed | The request method is not `POST`                                            |

---

### POST `/api/v1/warehouse/orders/dates/within-delivered`

Retrieves a list of orders within the two deliver dates specified

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "startDate": "2022-07-03T09:03:40.585Z",
  "endDate": "2022-07-04T17:03:40.585Z"
}
```

> **Constraints:**
>
> - `startDate` and `endDate` must be valid date formats

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "DELIVERED",
    "orderedAt": "2022-06-26T08:32:15.028Z",
    "shippedAt": "2022-06-28T08:32:15.028Z",
    "deliveredAt": "2022-07-04T08:32:15.028Z",
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
  ]
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the order to update
> - All the id fields must be a valid cuid
> - `status` accepts "ORDERED", "IN_PROGRESS", "SHIPPED", "IN_TRANSIT", "DELIVERING" and "DELIVERED" as valid values
> - `shippedAt` and `deliveredAt` can be null

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                                                                 |
| ---------------------: | :-------------------------------------------------------------------------- |
|        400 Bad Request | The `startDate` and/or `endDate` fields provided are not valid date formats |
| 405 Method Not Allowed | The request method is not `POST`                                            |

---

## Employee

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
      "role":"ADMIN"
    },
    ...
  ]
}
```

> **Constraints:**
>
> - `role` can be only "ADMIN" or "WORKER"

---

### GET `/api/v1/warehouse/employees/employee`

Get an employee with the id written in the JWT

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The jwt must be valid and contain the id of the employee

#### Return: <!-- omit in toc -->

```json
{
  "employee": {
    "id": "ch72gsb320000udocl363eofy",
    "email": "example@example.com",
    "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
    "createdAt": "01-01-1970-00:00:00",
    "updatedAt": "01-01-1970-00:00:00",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
|       `401` Unauthorized | The JWT is not valid or not present |
|          `404` Not Found | No matching employee were found     |
| `405` Method Not Allowed | The request method is not `GET`     |

---

### POST `/api/v1/warehouse/employees/employee`

Create a new employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "example@example.com",
  "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ADMIN"
}
```

> **Constraints:**
>
> - `email` must have a valid email address syntax
> - `password` must be already hashed
> - `role` accepts only "ADMIN" and "WORKER" as valid values

#### Return: <!-- omit in toc -->

```json
{
  "employee": {
    "id": "ch72gsb320000udocl363eofy",
    "email": "example@example.com",
    "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
    "createdAt": "01-01-1970-00:00:00",
    "updatedAt": "01-01-1970-00:00:00",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

> **Constraints:**
>
> - `role` can be only "ADMIN" or "WORKER"

#### Possible errors: <!-- omit in toc -->

|             Error code | Description                         |
| ---------------------: | :---------------------------------- |
|        400 Bad Request | The request body content is invalid |
| 405 Method Not Allowed | The request method is not `POST`    |

---

### PATCH `/api/v1/warehouse/employees/employee`

Update the fields of an employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "ch72gsb320000udocl363eofy",
  "employee": {
    "email": "example@example.com",
    "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

> **Constraints:**
>
> - The `id` field is readonly, used only to query the employee to update
> - `email` must have a valid email address syntax
> - `password` must be already hashed
> - `role` accepts only "ADMIN" and "WORKER" as valid values

#### Return: <!-- omit in toc -->

```json
{
  "employee": {
    "id": "ch72gsb320000udocl363eofy",
    "email": "example@example.com",
    "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
    "createdAt": "01-01-1970-00:00:00",
    "updatedAt": "01-01-1970-00:00:00",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

> **Constraints:**
>
> - `role` can be only "ADMIN" or "WORKER"

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
| `405` Method Not Allowed | The request method is not `PATCH`   |

---

### DELETE `/api/v1/warehouse/employees/employee`

Delete a specific employee

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

> **Constraints:**
>
> - `id` must be a valid cuid

#### Return: <!-- omit in toc -->

```json
{
  "employee": {
    "id": "ch72gsb320000udocl363eofy",
    "email": "example@example.com",
    "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
    "createdAt": "01-01-1970-00:00:00",
    "updatedAt": "01-01-1970-00:00:00",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

> **Constraints:**
>
> - `role` can be only "ADMIN" or "WORKER"

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
| `405` Method Not Allowed | The request method is not `DELETE`  |

---

### POST `/api/v1/warehouse/employees/employee/name`

Find an employee by its first name and last name

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "employee": {
    "id": "ch72gsb320000udocl363eofy",
    "email": "example@example.com",
    "password": "988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
    "createdAt": "01-01-1970-00:00:00",
    "updatedAt": "01-01-1970-00:00:00",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }
}
```

> **Constraints:**
>
> - `role` can be only "ADMIN" or "WORKER"

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
| `405` Method Not Allowed | The request method is not `POST`    |

---

### GET `/api/v1/warehouse/employees/role/{role}`

Find a list of employee filtered by role

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

> **Constraints:**
>
> - `role` only accepts `ADMIN` or `WORKER` as valid values

#### Return: <!-- omit in toc -->

```json
{
  "employees":[
    {
      "id":"ch72gsb320000udocl363eofy",
      "email":"example@example.com",
      "password":"988119d6cca702beb1748f4eb497e316467f69580ffa125aa8bcb6fb63dce237",
      "createdAt":"01-01-1970-00:00:00",
      "updatedAt":"01-01-1970-00:00:00",
      "firstName":"John",
      "lastName":"Doe",
      "role":"ADMIN"
    },
    ...
  ]
}
```

> **Constraints:**
>
> - `role` can be only "ADMIN" or "WORKER"

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                        |
| -----------------------: | :------------------------------------------------- |
|        `400` Bad Request | The request body content or parameters are invalid |
|          `404` Not Found | No employees found with the specified role         |
| `405` Method Not Allowed | The request method is not `GET`                    |

---

---

## Ecommerce

## Login

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

> **Constraints:**
>
> - `email` must have a valid email address syntax
> - `password` must be already hashed

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
