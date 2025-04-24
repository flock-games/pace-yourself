import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  // Get event and goal from body
  const body = await readBody(event);
  const { event: eventName, goal } = body as { event: string; goal: number };

  const { data, error } = await supabase
    .from("goals")
    .insert({ event: eventName, goal: goal })
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
