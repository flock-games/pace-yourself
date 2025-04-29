import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw createError({
      status: 403,
      statusMessage: "Unauthorized",
    });
  }

  // Select all tokens from the DB
  const { data, error } = await supabase
    .from("access_tokens")
    .select("token,expires_at")
    .order("expires_at", { ascending: false });

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

  const record = data[0];

  if (record.expires_at && record.expires_at < Date.now() / 1000) {
    // Exchange refresh token for new access token
    const { data, error } = await supabase
      .from("refresh_tokens")
      .select("token")
      .order("created_at", { ascending: false })
      .single();
    if (error || !data) {
      console.error("Error retrieving refresh token:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to retrieve refresh token",
      });
    }

    const config = useRuntimeConfig(event);
    const refreshToken = data.token;
    const clientId = "156255";
    const clientSecret = config.stravaClientSecret;

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken ?? "",
      grant_type: "refresh_token",
    });
    const url = `https://www.strava.com/oauth/token?${params}`;
    const tokenResponse = await fetch(url, {
      method: "POST",
    });

    const json = await tokenResponse.json();
    const accessToken = json.access_token as string;
    const newRefreshToken = json.refresh_token;
    const expiresAt = parseInt(json.expires_at);

    const { data: tokenData, error: tokenError } = await supabase
      .from("access_tokens")
      .upsert({
        user_id: user.id,
        token: accessToken,
        expires_at: expiresAt,
      });

    const { data: refreshTokenData, error: refreshTokenError } = await supabase
      .from("refresh_tokens")
      .upsert({
        user_id: user.id,
        token: newRefreshToken,
      });

    return {
      token: accessToken,
    };
  }

  return {
    token: data[0].token,
  };
});
