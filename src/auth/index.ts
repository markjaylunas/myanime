import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const BASE_PATH = "/api/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
});
