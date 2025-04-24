import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { token } = query as { token: string };

  const data = await $fetch(
    `https://www.strava.com/api/v3/athlete/activities`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Activities response:", data);

  if (!data) {
    createError({
      status: 400,
      statusMessage: "Error getting activities from Strava.",
    });
  }

  return data.map((activity: any) => {
    return {
      start_date_local: activity.start_date_local,
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
    };
  });
});
