import z from "zod";

const envSchema = z.object({
  CONSUMET_API_BASE_URL: z.string().startsWith("https://"),
  ANIWATCH_API_BASE_URL: z.string().startsWith("https://"),
});

export const env = envSchema.parse(process.env);
