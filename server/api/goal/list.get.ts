import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  // Select all goals from the DB
  const { data, error } = await supabase.from("goals").select("*");

  if (error) {
    console.error("Error retrieving goals:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to retrieve goals",
    });
  }

  return data;
});
