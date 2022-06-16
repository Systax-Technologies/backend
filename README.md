# project work

## backend

This repo contains a [Remix.run](https://remix.run) project with a [Postgresql](https://postgresql.org) database queried with [Prisma.io](https://prisma.io).

The backend also exposes API routes in the [/api](./app/routes/api) folder.

All requests to the API routes **must** have the `authorization` header set with the token in the form:

```ts
const headers = {
  authorization: `Bearer ${getAccessToken()}`,
};
```

All API routes accept only `application/json` as `Content-Type` in body request and return `application/json` as `Content-Type` in response body.

> ⚠️ please note that the `null` value can also be returned as body response of a 200 or 204 response

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

In order to run the `prisma studio`, run:

```sh
$ npx prisma studio
```

If you got a connection error, try the following:

```sh
$ DATABASE_URL="postresql://<user>:<password>@<host>:<port>/<db>" npx prisma studio
```
