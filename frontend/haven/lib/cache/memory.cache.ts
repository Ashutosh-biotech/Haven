type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const CACHE = new Map<string, CacheEntry<any>>();
const TTL = 1000 * 60 * 60;

export function getCache<T>(key: string): T | null {
  const entry = CACHE.get(key);

  if (!entry) return null;

  if (Date.now() - entry.timestamp > TTL) {
    CACHE.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache<T>(key: string, data: T) {
  CACHE.set(key, { data, timestamp: Date.now() });
}