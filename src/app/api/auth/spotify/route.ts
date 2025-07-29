//src/app/api/auth/spotify/route.ts
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
// const SCOPES = ["user-read-private", "user-read-email"].join(" ");
const SCOPES = [
  "user-library-read",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-library-modify",
].join(" ");

export async function GET() {
  if (!CLIENT_ID || !REDIRECT_URI) {
    throw new Error("Falta SPOTIFY_CLIENT_ID ou SPOTIFY_REDIRECT_URI");
  }
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", CLIENT_ID);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);

  return NextResponse.redirect(authUrl.toString());
}
