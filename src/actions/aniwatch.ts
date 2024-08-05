"use server";

import { aniwatchAPIQuery } from "@/lib/aniwatch-api";
import { aWHomeDataSchema } from "@/lib/aniwatch-validations";

export async function fetchAniwatchHomeData() {
  try {
    const response = await fetch(aniwatchAPIQuery.home({}), {
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    const parsed = aWHomeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
