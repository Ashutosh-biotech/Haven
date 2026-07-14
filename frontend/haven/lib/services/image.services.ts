import { fetchFromPexels } from "../providers/pexels.provider";
import { fetchFromUnsplash } from "../providers/unsplash.provider";
import { fetchFromPixabay } from "../providers/pixabay.provider";
import { getCache, setCache } from "../cache/memory.cache";
import {ImageResult} from "@/components/interface/ImageResult";

function normalize(query: string) {
  return query.toLowerCase().trim();
}

export async function getImage(query: string): Promise<ImageResult> {
  const cleanQuery: string = normalize(query);

  // 1. Cache
  const cached: ImageResult | null = getCache<ImageResult>(cleanQuery);
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