import NextAuth, { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { JWT } from "next-auth/jwt";

function decodeJWTPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const decoded =
      typeof Buffer !== "undefined"
        ? Buffer.from(padded, "base64").toString()
        : atob(padded);

    return JSON.parse(decoded);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
}

const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET || "",
      issuer:
        `https://cognito-idp.${process.env.COGNITO_USER_POOL_ID?.split("_")[0]}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}` ||
        "",
      authorization: {
        params: {
          response_type: "code",
          scope: "email openid profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Get username and group from access token
      if (account?.access_token) {
        token.accessToken = account.access_token;
        const payload = decodeJWTPayload(account.access_token);

        if (payload?.username) {
          token.username = payload.username;
        }

        if (payload?.["cognito:groups"]) {
          token.groups = payload["cognito:groups"];
        } else {
          token.groups = [];
        }
      }
      return token;
    },

    async session({ session, token }) {
      if ((token as JWT).username) {
        session.user.name = (token as JWT).username;
      }

      if ((token as JWT).groups) {
        session.user.groups = (token as JWT).groups;
      } else {
        session.user.groups = [];
      }

      // 不要なフィールドを削除
      delete session.user.image;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
};

// App Router では名前付きエクスポートを使用
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
