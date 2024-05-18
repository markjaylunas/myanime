import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const BASE_PATH = "/api/auth";

export const authConfig = {
  providers: [GitHub, Google],
  session: { strategy: "jwt" },
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);
