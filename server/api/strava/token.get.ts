import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  // Select all goals from the DB
  const { data, error } = await supabase.from("access_tokens").select("token");

  if (error) {
    console.error("Error retrieving token:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to retrieve token",
    });
  }

  if (!data || data.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "No token found",
    });
  }

  return {
    token: data[0].token,
  };
});
