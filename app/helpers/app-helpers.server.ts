/**
 * Throws a 400 HTTP repsonse
 *
 */
export const badRequest = () => {
  throw new Response(null, {
    status: 400,
    statusText: "Bad Request",
  });
};

/**
 * Throws a 401 HTTP response
 */
export const unauthorizedRequest = () => {
  throw new Response(null, {
    status: 401,
    statusText: "Unauthorized",
  });
};

/**
 * Throws a 403 HTTP repsonse
 *
 */
export const forbiddenRequest = () => {
  throw new Response(null, {
    status: 403,
    statusText: "Forbidden",
  });
};

/**
 * Throws a 404 HTTP repsonse
 *
 */
export const notFoundRequest = () => {
  throw new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
};

/**
 * Throws a 405 HTTP response
 */
export const methodNotAllowed = () => {
  throw new Response(null, {
    status: 405,
    statusText: "Method Not Allowed",
  });
};
