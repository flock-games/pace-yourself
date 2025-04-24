import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const { data, error } = await supabase
    .from("goals")
    .insert({ event: "5k", goal: 5000 })
    .select()
    .single();

  if (error) {
    console.error("Error inserting data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to insert data",
    });
  }

  console.log(data);
  return data;
});
