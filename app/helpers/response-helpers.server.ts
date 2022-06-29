/**
 * Return a 200 HTTP response
 * @param body The body of the response
 */
export const okResponse = (body: string) => {
  return new Response(body, {
    status: 200,
    statusText: "OK",
  });
};
/**
 * Return a 400 HTTP repsonse
 *
 */
export const badRequestResponse = () => {
  return new Response(null, {
    status: 400,
    statusText: "Bad Request",
  });
};

/**
 * Return a 401 HTTP response
 */
export const unauthorizedResponse = () => {
  return new Response(null, {
    status: 401,
    statusText: "Unauthorized",
  });
};

/**
 * Return a 403 HTTP repsonse
 *
 */
export const forbiddenResponse = () => {
  return new Response(null, {
    status: 403,
    statusText: "Forbidden",
  });
};

/**
 * Return a 404 HTTP repsonse
 *
 */
export const notFoundResponse = () => {
  return new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
};

/**
 * Return a 405 HTTP response
 */
export const methodNotAllowedResponse = () => {
  return new Response(null, {
    status: 405,
    statusText: "Method Not Allowed",
  });
};
