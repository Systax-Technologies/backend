/**
 * Return a 400 HTTP repsonse
 *
 */
export const badRequest = () => {
  return new Response(null, {
    status: 400,
    statusText: "Bad Request",
  });
};

/**
 * Return a 401 HTTP response
 */
export const unauthorizedRequest = () => {
  return new Response(null, {
    status: 401,
    statusText: "Unauthorized",
  });
};

/**
 * Return a 403 HTTP repsonse
 *
 */
export const forbiddenRequest = () => {
  return new Response(null, {
    status: 403,
    statusText: "Forbidden",
  });
};

/**
 * Return a 404 HTTP repsonse
 *
 */
export const notFoundRequest = () => {
  return new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
};

/**
 * Return a 405 HTTP response
 */
export const methodNotAllowed = () => {
  return new Response(null, {
    status: 405,
    statusText: "Method Not Allowed",
  });
};
