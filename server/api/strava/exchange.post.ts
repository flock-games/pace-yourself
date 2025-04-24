import { defineEventHandler, getQuery } from "h3";

import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) {
    throw createError({
      status: 403,
      statusMessage: "Unauthorized",
    });
  }
  const config = useRuntimeConfig(event);

  const query = getQuery(event);
  const code = query.code?.toString();
  if (!code) {
    throw createError({ status: 400, statusMessage: "Code is required" });
  }

  const clientId = "156255";
  const clientSecret = config.stravaClientSecret;

  if (!clientId || !clientSecret) {
    throw createError({
      status: 400,
      statusMessage: "Invalid Strava API credentials",
    });
  }
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    grant_type: "authorization_code",
  });
  const url = `https://www.strava.com/oauth/token?${params}`;
  const tokenResponse = await fetch(url, {
    method: "POST",
  });

  console.log("Token response:", tokenResponse);

  if (!tokenResponse.ok) {
    throw createError({
      status: 400,
      statusMessage: "Error getting token from Strava.",
    });
  }
  const json = await tokenResponse.json();
  const accessToken = json.access_token as string;
  const refreshToken = json.refresh_token;
  const expiresAt = parseInt(json.expires_at);
  const athleteId = json.athlete.id;

  const { data, error } = await client
    .from("profile")
    .upsert({ user_id: user.id, strava_id: athleteId })
    .select();

  const { data: tokenData, error: tokenError } = await client
    .from("access_tokens")
    .upsert({
      user_id: user.id,
      token: accessToken,
      expires_at: expiresAt,
    });

  const { data: refreshTokenData, error: refreshTokenError } = await client
    .from("refresh_tokens")
    .upsert({
      user_id: user.id,
      token: accessToken,
    });

  return {
    accessToken,
  };
});
