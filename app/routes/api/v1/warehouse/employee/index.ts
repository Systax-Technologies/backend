import { json, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { verifyRequest } from "~/lib/verify-request.server";
import { findEmployeeById } from "~/models/employee/employee.server";

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method.toLowerCase() !== "get") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  const jwt = verifyRequest(request);

  const schema = z.object({
    id: z.string(),
  });

  const parsedData = schema.safeParse(
    typeof jwt === "string" ? JSON.parse(jwt) : jwt,
  );

  if (parsedData.success) {
    const employee = await findEmployeeById(parsedData.data.id);

    if (employee == null) {
      throw new Response(null, {
        status: 404,
        statusText: "Employee Not Found",
      });
    }

    return json(employee);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Invalid Request",
    });
  }
};
