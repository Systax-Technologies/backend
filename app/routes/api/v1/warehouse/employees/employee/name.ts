import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from "zod";
import { parseBody } from "~/lib/parse-body.server";
import { findEmployeeByName } from "~/models/employee/employee.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() != "post") {
    throw new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
  });

  const parsedData = await parseBody(request, schema);

  if (parsedData.success) {
    const data = parsedData.data;
    const employee = await findEmployeeByName(data.firstName, data.lastName);
    return json(employee);
  } else {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
};
