//src/app/api/auth/spotify/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export async function GET(req: NextRequest) {
  if (!CLIENT_ID || !REDIRECT_URI || !CLIENT_SECRET) {
    throw new Error(
      "Falta SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI ou CLIENT_SECRET",
    );
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code)
    return NextResponse.json({ error: "Code faltando" }, { status: 400 });

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await response.json();
  const access_token = data.access_token;

  if (!access_token)
    return NextResponse.json({ error: "Token não recebido" }, { status: 400 });

  return NextResponse.redirect(
    `${NEXTAUTH_URL}/spotify-playlist?token=${access_token}`,
  );
}
