import useSWR from "swr";
import { CoinGeckoMarketDataType } from "../types/data.type";
import { cachedJsonFetch } from "../utils/cachedJsonFetch";
import { COINGECKO_API_URL, getCoinGeckoApiKeyParam } from "./coinGecko";

type CoinTrendRequest =
  | {
      type: "markets";
      url: string;
      cacheKey: string;
    }
  | {
      type: "trending";
      url: string;
      cacheKey: string;
      marketCacheKey: string;
    };

type CoinGeckoTrendingResponse = {
  coins: {
    item: {
      id: string;
    };
  }[];
};

const COIN_LIST_CACHE_TTL_MS = 1000 * 60 * 60 * 24;

type Fetcher = typeof fetch;

const trendTypeToMarketOrder = (trendType: string) => {
  if (trendType === "/totalvolfull") return "volume_desc";
  return "market_cap_desc";
};

const getMarketsUrl = ({
  order,
  limit,
  ids,
}: {
  order: string;
  limit: number;
  ids?: string;
}) => {
  const idsParam = ids ? `&ids=${encodeURIComponent(ids)}` : "";

  return `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=${order}&per_page=${limit}&page=1&sparkline=false&price_change_percentage=1h,24h,7d${idsParam}${getCoinGeckoApiKeyParam()}`;
};

export const getCoinTrendsRequest = (
  trendType: string,
  limit: number = 25
): CoinTrendRequest => {
  if (trendType === "/totaltoptiervolfull") {
    return {
      type: "trending",
      url: `${COINGECKO_API_URL}/search/trending${getCoinGeckoApiKeyParam(
        "?"
      )}`,
      cacheKey: `coin-gecko:trending:${limit}`,
      marketCacheKey: `coin-gecko:trending-markets:${limit}`,
    };
  }

  const order = trendTypeToMarketOrder(trendType);
  const url = getMarketsUrl({ order, limit });
  const cacheKey = `coin-gecko:markets:${order}:${limit}`;

  return { type: "markets", url, cacheKey };
};

export const fetchCoinTrends = async (
  trendType: string,
  limit: number = 25,
  fetcher?: Fetcher
) => {
  const request = getCoinTrendsRequest(trendType, limit);

  if (request.type === "markets") {
    return cachedJsonFetch<CoinGeckoMarketDataType[]>(request.url, {
      cacheKey: request.cacheKey,
      ttlMs: COIN_LIST_CACHE_TTL_MS,
      fetcher,
    });
  }

  const trendingData = await cachedJsonFetch<CoinGeckoTrendingResponse>(
    request.url,
    {
      cacheKey: request.cacheKey,
      ttlMs: COIN_LIST_CACHE_TTL_MS,
      fetcher,
    }
  );
  const ids = trendingData.coins
    .map(({ item }) => item.id)
    .filter(Boolean)
    .slice(0, limit)
    .join(",");

  if (!ids) return [];

  return cachedJsonFetch<CoinGeckoMarketDataType[]>(
    getMarketsUrl({
      order: "market_cap_desc",
      limit,
      ids,
    }),
    {
      cacheKey: request.marketCacheKey,
      ttlMs: COIN_LIST_CACHE_TTL_MS,
      fetcher,
    }
  );
};

export const useCoinTrends = (trendType: string, limit: number = 25) => {
  const { cacheKey } = getCoinTrendsRequest(trendType, limit);

  const { data, error, isLoading } = useSWR<CoinGeckoMarketDataType[]>(
    cacheKey,
    () => fetchCoinTrends(trendType, limit),
    {
      dedupingInterval: COIN_LIST_CACHE_TTL_MS,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return { data, isLoading, error };
};
