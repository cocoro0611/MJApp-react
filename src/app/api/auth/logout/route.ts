import { NextResponse } from "next/server";

export async function POST() {
  const cognitoDomain = process.env.COGNITO_DOMAIN || "";
  const clientId = process.env.COGNITO_CLIENT_ID || "";
  const logoutRedirectUri = process.env.NEXTAUTH_URL || "";

  const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutRedirectUri)}`;

  return NextResponse.json({ logoutUrl });
}
