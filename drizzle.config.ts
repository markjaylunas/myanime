import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { cwd } from "process";

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
