import { fetchFromPexels } from "../providers/pexels";
import { fetchFromUnsplash } from "../providers/unsplash";
import { fetchFromPixabay } from "../providers/pixabay";
import { getCache, setCache } from "../cache/memoryCache";

export type ImageResult = {
  url: string;
  source: string;
  photographer?: string;
};

function normalize(query: string) {
  return query.toLowerCase().trim();
}

export async function getImage(query: string): Promise<ImageResult> {
  const cleanQuery = normalize(query);

  // 1. Cache
  const cached = getCache<ImageResult>(cleanQuery);
  if (cached) return cached;

  try {
    // 2. Providers chain
    const providers = [
      fetchFromPexels,
      fetchFromUnsplash,
      fetchFromPixabay,
    ];

    for (const provider of providers) {
      const result = await provider(cleanQuery);
      if (result) {
        setCache(cleanQuery, result);
        return result;
      }
    }

    return {
      url: "https://images.pexels.com/photos/27968632/pexels-photo-27968632.jpeg",
      source: "404 not found",
    };
  } catch (err) {
    console.error("Image Service Error:", err);
    return {
      url: "https://images.pexels.com/photos/27968632/pexels-photo-27968632.jpeg",
      source: "404 not found",
    };
  }
}