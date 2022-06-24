/**
 * Throws a 405 HTTP response
 */
export const methodNotAllowed = () => {
  throw new Response(null, {
    status: 405,
    statusText: "Method Not Allowed",
  });
};
