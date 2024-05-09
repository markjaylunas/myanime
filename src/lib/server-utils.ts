import {
  animeDataSchema,
  animeInfoSchema,
  recentAnimeEpisodeDataSchema,
  searchAnimeDataSchema,
} from "./validations";

export async function fetchAnimeListData(url: string) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();

    const parsed = animeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchRecentAnimeEpisodeListData(url: string) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();

    const parsed = recentAnimeEpisodeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAnimeInfoData(url: string) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();

    const parsed = animeInfoSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchAnimeListData(url: string) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();

    const parsed = searchAnimeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
