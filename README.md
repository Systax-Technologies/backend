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

- [Ecommerce](#ecommerce)
  - [Customers](#customers)
    - [POST `/api/v1/ecommerce/customers`](#post-apiv1ecommercecustomers)
    - [PATCH `/api/v1/ecommerce/customers`](#patch-apiv1ecommercecustomers)
    - [DELETE `/api/v1/ecommerce/customers`](#delete-apiv1ecommercecustomers)
    - [POST `/api/v1/ecommerce/customers/creditCard`](#post-apiv1ecommercecustomerscreditcard)
    - [POST `/api/v1/ecommerce/customers/login`](#post-apiv1ecommercecustomerslogin)
  - [Orders](#orders)
    - [POST `/api/v1/ecommerce/orders`](#post-apiv1ecommerceorders)
- [Warehouse](#warehouse)
  - [Active Product](#active-product)
    - [GET `/api/v1/warehouse/activeProducts`](#get-apiv1warehouseactiveproducts)
    - [POST `/api/v1/warehouse/activeProducts`](#post-apiv1warehouseactiveproducts)
    - [PATCH `/api/v1/warehouse/activeProducts`](#patch-apiv1warehouseactiveproducts)
    - [DELETE `/api/v1/warehouse/activeProducts`](#delete-apiv1warehouseactiveproducts)
    - [GET `/api/v1/warehouse/activeProducts/{activeProductInstanceId}`](#get-apiv1warehouseactiveproductsactiveproductinstanceid)
  - [Customers](#customers-1)
    - [GET `/api/v1/warehouse/customers`](#get-apiv1warehousecustomers)
    - [GET `/api/v1/warehouse/customers/{customerId}`](#get-apiv1warehousecustomerscustomerid)
    - [DELETE `/api/v1/warehouse/customers/{customerId}`](#delete-apiv1warehousecustomerscustomerid)
    - [GET `/api/v1/warehouse/customers/{customerId}/activeProducts`](#get-apiv1warehousecustomerscustomeridactiveproducts)
    - [GET `/api/v1/warehouse/customers/{customerId}/orders`](#get-apiv1warehousecustomerscustomeridorders)
  - [Employees](#employees)
    - [GET `/api/v1/warehouse/employees`](#get-apiv1warehouseemployees)
    - [POST `/api/v1/warehouse/employees`](#post-apiv1warehouseemployees)
    - [POST `/api/v1/warehouse/employees/login`](#post-apiv1warehouseemployeeslogin)
    - [GET `/api/v1/warehouse/employees/me`](#get-apiv1warehouseemployeesme)
    - [GET `/api/v1/warehouse/employees/{employeeId}`](#get-apiv1warehouseemployeesemployeeid)
    - [PATCH `/api/v1/warehouse/employees/{employeeId}`](#patch-apiv1warehouseemployeesemployeeid)
    - [DELETE `/api/v1/warehouse/employees/{employeeId}`](#delete-apiv1warehouseemployeesemployeeid)
  - [Orders](#orders-1)
    - [GET `/api/v1/warehouse/orders`](#get-apiv1warehouseorders)
    - [GET `/api/v1/warehouse/orders/{id}`](#get-apiv1warehouseordersid)
    - [PATCH `/api/v1/warehouse/orders/by-id`](#patch-apiv1warehouseordersby-id)
    - [DELETE`/api/v1/warehouse/orders/by-id`](#deleteapiv1warehouseordersby-id)
    - [GET `/api/v1/warehouse/orders//by-status/{status}`](#get-apiv1warehouseordersby-statusstatus)
    - [POST `/api/v1/warehouse/orders/dates/within-delivered`](#post-apiv1warehouseordersdateswithin-delivered)
    - [POST `/api/v1/warehouse/orders/dates/within-ordered`](#post-apiv1warehouseordersdateswithin-ordered)
    - [POST `/api/v1/warehouse/orders/dates/within-shipped`](#post-apiv1warehouseordersdateswithin-shipped)
  - [Product Instances](#product-instances)
    - [GET `/api/v1/warehouse/productInstances`](#get-apiv1warehouseproductinstances)
    - [POST `/api/v1/warehouse/productInstances`](#post-apiv1warehouseproductinstances)
    - [PATCH `/api/v1/warehouse/productInstances`](#patch-apiv1warehouseproductinstances)
    - [DELETE `/api/v1/warehouse/productInstances`](#delete-apiv1warehouseproductinstances)
    - [GET `/api/v1/warehouse/productInstances/{productInstanceId}`](#get-apiv1warehouseproductinstancesproductinstanceid)
    - [POST `/api/v1/warehouse/productInstances/productInstanceActivation`](#post-apiv1warehouseproductinstancesproductinstanceactivation)
    - [GET `/api/v1/warehouse/productInstances/count/by-status/{productInstanceStatus}`](#get-apiv1warehouseproductinstancescountby-statusproductinstancestatus)
    - [GET `/api/v1/warehouse/productInstances/count/by-type/{productId}`](#get-apiv1warehouseproductinstancescountby-typeproductid)
  - [Product](#product)
    - [GET `/api/v1/warehouse/products`](#get-apiv1warehouseproducts)
    - [POST `/api/v1/warehouse/products`](#post-apiv1warehouseproducts)
    - [GET `/api/v1/warehouse/products/{productId}`](#get-apiv1warehouseproductsproductid)
    - [PATCH `/api/v1/warehouse/products/{product-id}`](#patch-apiv1warehouseproductsproduct-id)
    - [DELETE `/api/v1/warehouse/products/{product-id}`](#delete-apiv1warehouseproductsproduct-id)

---

# Ecommerce

## Customers

### POST `/api/v1/ecommerce/customers`

Create a new customer

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "example@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe",
  "billingAddressId": "cl52gilrq0059g4jjj50ffvdg",
  "shippingAddressId": "cl4zoemig0036l2jjv0efdted"
}
```

> **Constraints:**
>
> - `email` must have a valid email address syntax
> - `password` must have at least 8 characters

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "example@example.com",
  "password": "password",
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z",
  "firstName": "John",
  "lastName": "Doe",
  "billingAddressId": "cl52gilrq0059g4jjj50ffvdg",
  "shippingAddressId": "cl4zoemig0036l2jjv0efdted"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
| `405` Method Not Allowed | The request method is not `POST`    |

---

### PATCH `/api/v1/ecommerce/customers`

Update customer info

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid customer id

#### Required Body: <!-- omit in toc -->

```json
{
  "customer": {
    "email": "example@example.com",
    "password": "password",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

> **Constraints:**
>
> - `email` must have a valid email address syntax
> - `password` must have at least 8 characters

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "example@example.com",
  "password": "password",
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z",
  "firstName": "John",
  "lastName": "Doe",
  "billingAddressId": "cl52gilrq0059g4jjj50ffvdg",
  "shippingAddressId": "cl4zoemig0036l2jjv0efdted"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                         |
| -----------------------: | :---------------------------------- |
|        `400` Bad Request | The request body content is invalid |
|          `404` Not Found | Customer not found                  |
| `405` Method Not Allowed | The request method is not `PATCH`   |

---

### DELETE `/api/v1/ecommerce/customers`

Delete a customer

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid customer id

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "example@example.com",
  "password": "password",
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z",
  "firstName": "John",
  "lastName": "Doe",
  "billingAddressId": "cl52gilrq0059g4jjj50ffvdg",
  "shippingAddressId": "cl4zoemig0036l2jjv0efdted"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Customer not found                   |
| `405` Method Not Allowed | The request method is not `PATCH`    |

---

### POST `/api/v1/ecommerce/customers/creditCard`

Create a customer credit card

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid customer id

#### Required Body: <!-- omit in toc -->

```json
{
  "creditCard": {
    "number": 1234567887654321,
    "expMonthDate": 1,
    "expoYearDate": 1970,
    "secretCode": 123
  }
}
```

> **Constraints:**
>
> - `number` must be positive
> - `expMonthDate` must be between `1` and `12`
> - `expYearDate` must be greater than `1970`
> - `secretCode` must be positive

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl5atk1nr002506jjot8atd5p",
  "number": 1234567887654321,
  "expMonthDate": 1,
  "expoYearDate": 1970,
  "secretCode": 123
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Customer not found                   |
| `405` Method Not Allowed | The request method is not `POST`     |

---

### POST `/api/v1/ecommerce/customers/login`

Get a valid jwt for a customer

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "example@example.com",
  "password": "password"
}
```

> **Constraints:**
>
> - `email` must have a valid email address syntax

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

## Orders

### POST `/api/v1/ecommerce/orders`

Creates an order given the id of the customer and a list of product id with relative quantity

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

#### Required Body: <!-- omit in toc -->

```json
{
  "customerId": "cl5apl7c00037xhjjm5hela3m",
  "products": [
    {
      "productId": "cl4zoemig0036l2jjv0efdted",
      "quantity": 2
    },
    {
      "productId": "cl5ar5z3y0051cujjz0cq3jo7",
      "quantity": 1
    }
  ]
}
```

> **Constraints:**
>
> - `customerId` must be a valid cuid
> - `productId` must be a valid cuid
> - `quantity` must be a positive number

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

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                                          |
| -----------------------: | :------------------------------------------------------------------- |
|        `400` Bad Request | The request body content is invalid or the `customerId` do not exist |
|       `401` Unauthorized | Authentication credentials not valid                                 |
|          `404` Not Found | The `productId`(s) provided do not exist                             |
| `405` Method Not Allowed | The request method is not `POST`                                     |

---

# Warehouse

## Active Product

### GET `/api/v1/warehouse/activeProducts`

Get all the active products

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "products": [
    {
      "id": "cl4zoemig0036l2jjv0efdted",
      "status": "ACTIVE",
      "customerId": "c00p6qup20000ckkzslahp5pn"
    }
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### POST `/api/v1/warehouse/activeProducts`

Create a new Active Product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Required Body: <!-- omit in toc -->

```json
{
  "customerId": "c00p6qup20000ckkzslahp5pn"
}
```

> **Constraints:**
>
> - `customerId` must be a valid cuid

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "status": "ACTIVE",
  "customerId": "c00p6qup20000ckkzslahp5pn"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `POST`                  |

---

### PATCH `/api/v1/warehouse/activeProducts`

Update an Active Product status

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Required Body: <!-- omit in toc -->

```json
{
  "activeProductInstanceId": "cl4zoemig0036l2jjv0efdted",
  "status": "ACTIVE"
}
```

> **Constraints:**
>
> - `activeProductInsanceId` must be a valid cuid
> - `status` must be a valid `ActiveProductInstanceStatus`

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "status": "ACTIVE",
  "customerId": "c00p6qup20000ckkzslahp5pn"
}
```

### DELETE `/api/v1/warehouse/activeProducts`

Delete an Active Product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Required Body: <!-- omit in toc -->

```json
{
  "activeProductInstanceId": "cl4zoemig0036l2jjv0efdted"
}
```

> **Constraints:**
>
> - `activeProductInsanceId` must be a valid cuid

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "status": "ACTIVE",
  "customerId": "c00p6qup20000ckkzslahp5pn"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `PATCH`                 |

---

### GET `/api/v1/warehouse/activeProducts/{activeProductInstanceId}`

Get the active product with the specific `activeProductInstanceId`

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Return: <!-- omit in toc -->

```json
{
  {
    "id": "cl4zoemig0036l2jjv0efdted",
    "status": "ACTIVE",
    "customerId": "c00p6qup20000ckkzslahp5pn"
  }
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `GET`                   |

---

## Customers

### GET `/api/v1/warehouse/customers`

Get all the customers

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "customers": [
    {
      "id": "c00p6qup20000ckkzslahp5pn",
      "email": "john@doe.com",
      "password": "hashedpassword",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z",
      "firstName": "John",
      "lastName": "Doe",
      "billingAddressId": "ch72gsb320000udocl363eofy",
      "shippingAddressId": "c00p6qup20000ckkzslahp5pn"
    }
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### GET `/api/v1/warehouse/customers/{customerId}`

Get a specific customer

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  {
    "id": "c00p6qup20000ckkzslahp5pn",
    "email":"john@doe.com",
    "password":"hashedpassword",
    "createdAt":"1970-01-01T00:00:00.000Z",
    "updatedAt":"1970-01-01T00:00:00.000Z",
    "firstName":"John",
    "lastName":"Doe",
    "billingAddressId":"ch72gsb320000udocl363eofy",
    "shippingAddressId":"c00p6qup20000ckkzslahp5pn"
  }
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### DELETE `/api/v1/warehouse/customers/{customerId}`

Delete a specific customer

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  {
    "id": "c00p6qup20000ckkzslahp5pn",
    "email":"john@doe.com",
    "password":"hashedpassword",
    "createdAt":"1970-01-01T00:00:00.000Z",
    "updatedAt":"1970-01-01T00:00:00.000Z",
    "firstName":"John",
    "lastName":"Doe",
    "billingAddressId":"ch72gsb320000udocl363eofy",
    "shippingAddressId":"c00p6qup20000ckkzslahp5pn"
  }
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Customer not found                   |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### GET `/api/v1/warehouse/customers/{customerId}/activeProducts`

Get a specific customer's Active Products

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "activeProducts": [
    {
      "status": "",
      "id": "c00p6qup20000ckkzslahp5pn",
      "model": ""
    }
  ]
}
```

---

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Customer has no Active Products      |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### GET `/api/v1/warehouse/customers/{customerId}/orders`

Get a specific customer's Orders

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    {
      "id": "c00p6qup20000ckkzslahp5pn",
      "status": "ORDERED",
      "orderedAt": "1970-01-01T00:00:00.000Z",
      "shippedAt": "1970-01-01T00:00:00.000Z",
      "deliveredAt": "1970-01-01T00:00:00.000Z",
      "customerId": "c00p6qup20000ckkzslahp5pn"
    }
  ]
}
```

---

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Customer has no Orders               |
| `405` Method Not Allowed | The request method is not `GET`      |

---

## Employees

### GET `/api/v1/warehouse/employees`

List all the employees

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Return: <!-- omit in toc -->

```json
{
  "employees": [
    {
      "id": "",
      "email": "",
      "createdAt": "",
      "updatedAt": "",
      "firstName": "",
      "lastName": "",
      "role": "ADMIN"
    }
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `METHOD`                |

---

### POST `/api/v1/warehouse/employees`

Create a new employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "",
  "password": "",
  "firstName": "",
  "lastName": "",
  "role": ""
}
```

> **Constraints:**
>
> - `role` must be a valid Role

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "",
  "createdAt": "",
  "updatedAt": "",
  "firstName": "",
  "lastName": "",
  "role": "ADMIN"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `POST`                  |

---

### POST `/api/v1/warehouse/employees/login`

Get a valid jwt for an employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
```

#### Required Body: <!-- omit in toc -->

```json
{
  "email": "example@example.com",
  "password": "password"
}
```

> **Constraints:**
>
> - `email` must have a valid email address syntax

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
| `405` Method Not Allowed | The request method is not `POST`    |

---

### GET `/api/v1/warehouse/employees/me`

Get information about the current employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "",
  "password": "",
  "createdAt": "",
  "updatedAt": "",
  "firstName": "",
  "lastName": "",
  "role": "ADMIN"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### GET `/api/v1/warehouse/employees/{employeeId}`

Get information about a specific employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

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
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### PATCH `/api/v1/warehouse/employees/{employeeId}`

Get information about a specific employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "",
  "password": "",
  "createdAt": "",
  "updatedAt": "",
  "firstName": "",
  "lastName": "",
  "role": "ADMIN"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `PATCH`                 |

---

### DELETE `/api/v1/warehouse/employees/{employeeId}`

Delete a specific employee

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Return: <!-- omit in toc -->

```json
{
  "id": "",
  "email": "",
  "password": "",
  "createdAt": "",
  "updatedAt": "",
  "firstName": "",
  "lastName": "",
  "role": "ADMIN"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | Employee not found                                |
| `405` Method Not Allowed | The request method is not `DELETE`                |

---

## Orders

### GET `/api/v1/warehouse/orders`

Retrieves the complete list of orders.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "1970-01-01T00:00:00.000Z",
    "shippedAt": null,
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a",
    "productInstances": [
      {
        "id": "cl52gilrq0059g4jjj50ffvdg",
        "status": "SOLD",
        "orderId": "cl5atk1nr002506jjot8atd5p",
        "productId": "cl4zoemig0036l2jjv0efdted",
        "product": {
          "id": "cl4zoemig0036l2jjv0efdted",
          "model": "Test Product",
          "imageUrl": "/path/to/image",
          "description": "Test Description",
          "color": "Blue",
          "size": "M",
          "price": 19.99,
          "createdAt": "1970-01-01T00:00:00.000Z",
          "updatedAt": "1970-01-01T00:00:00.000Z"
        }
      },
    ]
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `DELETE`                |

---

### GET `/api/v1/warehouse/orders/{id}`

Retrieves a single order

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "id": "1970-01-01T00:00:00.000Z",
  "status": "ORDERED",
  "orderedAt": "1970-01-01T00:00:00.000Z",
  "shippedAt": null,
  "deliveredAt": null,
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a",
  "productInstances": [
    {
      "id": "cl52gilrq0059g4jjj50ffvdg",
      "status": "SOLD",
      "orderId": "cl5atk1nr002506jjot8atd5p",
      "productId": "cl4zoemig0036l2jjv0efdted",
      "product": {
        "id": "cl4zoemig0036l2jjv0efdted",
        "model": "Test Product",
        "imageUrl": "/path/to/image",
        "description": "Test Description",
        "color": "Blue",
        "size": "M",
        "price": 19.99,
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z"
      }
    },
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Order not found                      |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### PATCH `/api/v1/warehouse/orders/by-id`

Update an order

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "cl5apl7c00037xhjjm5hela3m",
  "status": "DELIVERED",
  "shippedAt": "1970-01-01T00:00:00.000Z",
  "deliveredAt": "1970-01-01T00:00:00.000Z"
}
```

> **Constraints:**
>
> - `id` must be a valid cuid
> - `status` must be a valid status

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4vfbh0u00009xjjvk2btxym",
  "status": "ORDERED",
  "orderedAt": "1970-01-01T00:00:00.000Z",
  "shippedAt": "1970-01-01T00:00:00.000Z",
  "deliveredAt": "1970-01-01T00:00:00.000Z",
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | The order do not exist                            |
| `405` Method Not Allowed | The request method is not `PATCH`                 |

---

### DELETE`/api/v1/warehouse/orders/by-id`

Set an order status to `CANCELLED`.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee

#### Required Body: <!-- omit in toc -->

```json
{
  "id": "cl5apl7c00037xhjjm5hela3m"
}
```

> **Constraints:**
>
> - `id` must be a valid cuid

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4vfbh0u00009xjjvk2btxym",
  "status": "CANCELLED",
  "orderedAt": "1970-01-01T00:00:00.000Z",
  "shippedAt": "1970-01-01T00:00:00.000Z",
  "deliveredAt": "1970-01-01T00:00:00.000Z",
  "customerId": "cl4qrmvvf0278tcjjl1zu8g6a"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | The order do not exist                            |
| `405` Method Not Allowed | The request method is not `DELETE`                |

---

### GET `/api/v1/warehouse/orders//by-status/{status}`

Get a list of orders that match the given status

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "1970-01-01T00:00:00.000Z",
    "shippedAt": null,
    "deliveredAt": null,
    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a",
    "productInstances": [
      {
        "id": "cl52gilrq0059g4jjj50ffvdg",
        "status": "SOLD",
        "orderId": "cl5atk1nr002506jjot8atd5p",
        "productId": "cl4zoemig0036l2jjv0efdted",
        "product": {
          "id": "cl4zoemig0036l2jjv0efdted",
          "model": "Test Product",
          "imageUrl": "/path/to/image",
          "description": "Test Description",
          "color": "Blue",
          "size": "M",
          "price": 19.99,
          "createdAt": "1970-01-01T00:00:00.000Z",
          "updatedAt": "1970-01-01T00:00:00.000Z"
        }
      },
    ]
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Order not found                      |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### POST `/api/v1/warehouse/orders/dates/within-delivered`

Get a list of orders delivered within the given dates

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Required Body: <!-- omit in toc -->

```json
{
  "startDate": "1970-01-01T00:00:00.000Z",
  "endDate": "1970-01-01T00:00:00.000Z"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "1970-01-01T00:00:00.000Z",
    "shippedAt": null,
    "deliveredAt": "1970-01-01T00:00:00.000Z",

    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a",
    "productInstances": [
      {
        "id": "cl52gilrq0059g4jjj50ffvdg",
        "status": "SOLD",
        "orderId": "cl5atk1nr002506jjot8atd5p",
        "productId": "cl4zoemig0036l2jjv0efdted",
        "product": {
          "id": "cl4zoemig0036l2jjv0efdted",
          "model": "Test Product",
          "imageUrl": "/path/to/image",
          "description": "Test Description",
          "color": "Blue",
          "size": "M",
          "price": 19.99,
          "createdAt": "1970-01-01T00:00:00.000Z",
          "updatedAt": "1970-01-01T00:00:00.000Z"
        }
      },
    ]
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Order not found                      |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### POST `/api/v1/warehouse/orders/dates/within-ordered`

Get a list of orders ordered within the given dates

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Required Body: <!-- omit in toc -->

```json
{
  "startDate": "1970-01-01T00:00:00.000Z",
  "endDate": "1970-01-01T00:00:00.000Z"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "1970-01-01T00:00:00.000Z",
    "shippedAt": null,
    "deliveredAt": null,

    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a",
    "productInstances": [
      {
        "id": "cl52gilrq0059g4jjj50ffvdg",
        "status": "SOLD",
        "orderId": "cl5atk1nr002506jjot8atd5p",
        "productId": "cl4zoemig0036l2jjv0efdted",
        "product": {
          "id": "cl4zoemig0036l2jjv0efdted",
          "model": "Test Product",
          "imageUrl": "/path/to/image",
          "description": "Test Description",
          "color": "Blue",
          "size": "M",
          "price": 19.99,
          "createdAt": "1970-01-01T00:00:00.000Z",
          "updatedAt": "1970-01-01T00:00:00.000Z"
        }
      },
    ]
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Order not found                      |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### POST `/api/v1/warehouse/orders/dates/within-shipped`

Get a list of orders ordered within the given dates

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Required Body: <!-- omit in toc -->

```json
{
  "startDate": "1970-01-01T00:00:00.000Z",
  "endDate": "1970-01-01T00:00:00.000Z"
}
```

#### Return: <!-- omit in toc -->

```json
{
  "orders": [
    "id": "cl4qrncms0334tcjj75gn06tv",
    "status": "ORDERED",
    "orderedAt": "1970-01-01T00:00:00.000Z",
    "shippedAt": "1970-01-01T00:00:00.000Z",
    "deliveredAt": null,

    "customerId": "cl4qrmvvf0278tcjjl1zu8g6a",
    "productInstances": [
      {
        "id": "cl52gilrq0059g4jjj50ffvdg",
        "status": "SOLD",
        "orderId": "cl5atk1nr002506jjot8atd5p",
        "productId": "cl4zoemig0036l2jjv0efdted",
        "product": {
          "id": "cl4zoemig0036l2jjv0efdted",
          "model": "Test Product",
          "imageUrl": "/path/to/image",
          "description": "Test Description",
          "color": "Blue",
          "size": "M",
          "price": 19.99,
          "createdAt": "1970-01-01T00:00:00.000Z",
          "updatedAt": "1970-01-01T00:00:00.000Z"
        }
      },
    ]
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Order not found                      |
| `405` Method Not Allowed | The request method is not `GET`      |

---

## Product Instances

### GET `/api/v1/warehouse/productInstances`

Retrieve the complete list of product instances.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

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

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `GET`                   |

---

### POST `/api/v1/warehouse/productInstances`

Create a number of new product instances given the quantity and the type of product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

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

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `POST`                  |

---

### PATCH `/api/v1/warehouse/productInstances`

Update the fields of a specific product instance

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

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

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Product Instance not found           |
| `405` Method Not Allowed | The request method is not `PATCH`    |

---

### DELETE `/api/v1/warehouse/productInstances`

Delete a specific product instance record and its related active product instance record (if present)

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

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

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | Product Instance not found                        |
| `405` Method Not Allowed | The request method is not `DELETE`                |

---

### GET `/api/v1/warehouse/productInstances/{productInstanceId}`

Retrieve a specific product instance

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

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

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `GET`                   |

---

### POST `/api/v1/warehouse/productInstances/productInstanceActivation`

Activate a specific product instance

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Required Body: <!-- omit in toc -->

```json
{
  "customerId": "ch72gsb320000udocl363eofy",
  "productInstanceId": "cl4zoemig0036l2jjv0efdted"
}
```

> **Constraints:**
>
> - The `id` fields must be a valid cuid

#### Return: <!-- omit in toc -->

```json
{
  "productInstanceActivated": {
    "id": "ch72gsb320000udocl363eofy",
    "status": "SOLD",
    "orderId": "c00p6qup20000ckkzslahp5pn",
    "productId": "cl4rb193000002a66jmw17ri3"
  }
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Product Instance not found           |
| `405` Method Not Allowed | The request method is not `POST`     |

---

### GET `/api/v1/warehouse/productInstances/count/by-status/{productInstanceStatus}`

Retrieve a count of product instances by their status

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Return: <!-- omit in toc -->

```json
{
  "numberOfProductInstances": 3
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | Product Instances not found                       |
| `405` Method Not Allowed | The request method is not `GET`                   |

---

### GET `/api/v1/warehouse/productInstances/count/by-type/{productId}`

Retrieve a count of product instances by their product type

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authorization: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Return: <!-- omit in toc -->

```json
{
  "numberOfProductInstances": 3
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | Product Instances not found                       |
| `405` Method Not Allowed | The request method is not `GET`                   |

---

## Product

### GET `/api/v1/warehouse/products`

List all products

#### Required Headers <!-- omit in toc -->

```
Content-Type: application/json
Authentication: Bearer <jwt>
```

#### Return <!-- omit in toc -->

```json
{
  "products": [
    {
      "model": "Watch",
      "imageUrl": ["/path/to/image"],
      "description": "A cool watch",
      "color": "Blue",
      "size": "L",
      "price": 199.99
    }
  ]
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### POST `/api/v1/warehouse/products`

Create a new product given the necessary parameters.

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authentication: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id with ADMIN role

#### Required Body: <!-- omit in toc -->

```json
{
  "model": "Watch",
  "imageUrl": ["/path/to/image"],
  "description": "A cool watch",
  "color": "Blue",
  "size": "L",
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
  "imageUrl": ["/path/to/image"],
  "description": "A cool watch",
  "color": "Blue",
  "size": "L",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-29T14:11:24.664Z"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
| `405` Method Not Allowed | The request method is not `POST`                  |

---

### GET `/api/v1/warehouse/products/{productId}`

Get a specific product

#### Required Headers <!-- omit in toc -->

```
Content-Type: application/json
Authentication: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return <!-- omit in toc -->

```json
{
  "model": "Watch",
  "imageUrl": ["/path/to/image"],
  "description": "A cool watch",
  "color": "Blue",
  "size": "L",
  "price": 199.99
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                          |
| -----------------------: | :----------------------------------- |
|        `400` Bad Request | The request body content is invalid  |
|       `401` Unauthorized | Authentication credentials not valid |
|          `404` Not Found | Product not found                    |
| `405` Method Not Allowed | The request method is not `GET`      |

---

### PATCH `/api/v1/warehouse/products/{product-id}`

Update the fields of a specific product

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authentication: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Required Body: <!-- omit in toc -->

```json
{
  "model": "Watch",
  "imageUrl": ["/path/to/image"],
  "description": "A cool watch",
  "color": "Black",
  "size": "L",
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
  "imageUrl": ["/path/to/image"],
  "description": "A cool watch",
  "color": "Black",
  "size": "L",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-30T15:02:55.335Z"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | Product not found                                 |
| `405` Method Not Allowed | The request method is not `PATCH`                 |

---

### DELETE `/api/v1/warehouse/products/{product-id}`

Delete a specific product record

#### Required Headers: <!-- omit in toc -->

```
Content-Type: application/json
Authentication: Bearer <jwt>
```

> **Constraints:**
>
> - The `jwt` must contain a valid employee id and role

#### Return: <!-- omit in toc -->

```json
{
  "id": "cl4zoemig0036l2jjv0efdted",
  "model": "Watch",
  "imageUrl": ["/path/to/image"],
  "description": "A cool watch",
  "color": "Black",
  "size": "L",
  "price": 199.99,
  "createdAt": "2022-06-29T14:10:44.094Z",
  "updatedAt": "2022-06-30T15:02:55.335Z"
}
```

#### Possible errors: <!-- omit in toc -->

|               Error code | Description                                       |
| -----------------------: | :------------------------------------------------ |
|        `400` Bad Request | The request body content is invalid               |
|       `401` Unauthorized | Authentication credentials not valid              |
|          `403` Forbidden | User has not enough rights to access the resource |
|          `404` Not Found | Product not found                                 |
| `405` Method Not Allowed | The request method is not `PATCH`                 |

---
