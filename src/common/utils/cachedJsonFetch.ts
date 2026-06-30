type Fetcher = typeof fetch;

type CachedJsonFetchOptions = {
  cacheKey: string;
  ttlMs: number;
  fetcher?: Fetcher;
};

type CacheEntry<T> = {
  expiresAt: number;
  data: T;
};

const pendingRequests = new Map<string, Promise<unknown>>();

export const cachedJsonFetch = async <T = unknown>(
  url: string,
  { cacheKey, ttlMs, fetcher = fetch }: CachedJsonFetchOptions
): Promise<T> => {
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const entry = JSON.parse(cached) as CacheEntry<T>;
      if (Date.now() < entry.expiresAt) {
        return entry.data;
      }
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  const pendingRequest = pendingRequests.get(cacheKey);
  if (pendingRequest) return pendingRequest as Promise<T>;

  const request = (async () => {
    const response = await fetcher(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as T;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        expiresAt: Date.now() + ttlMs,
        data,
      })
    );

    return data;
  })();

  pendingRequests.set(cacheKey, request);

  try {
    return await request;
  } finally {
    pendingRequests.delete(cacheKey);
  }
};
