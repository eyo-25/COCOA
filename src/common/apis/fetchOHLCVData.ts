import { CoinGeckoMarketChartDataType, TimeType } from "../types/data.type";
import { cachedJsonFetch } from "../utils/cachedJsonFetch";
import {
  COINGECKO_API_URL,
  getCoinGeckoApiKeyParam,
  getCoinGeckoId,
} from "./coinGecko";

const MARKET_CHART_CACHE_TTL_MS = 1000 * 60 * 5;

const timeTypeToDays: Record<TimeType, string> = {
  hour: "1",
  day: "1",
  week: "7",
  month: "30",
};

export const fetchOHLCVData = async (
  timeType: TimeType,
  coinIdOrSymbol: string
) => {
  const coinId = getCoinGeckoId(coinIdOrSymbol);
  const days = timeTypeToDays[timeType];

  const res = await cachedJsonFetch<CoinGeckoMarketChartDataType>(
    `${COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}${getCoinGeckoApiKeyParam()}`,
    {
      cacheKey: `coin-gecko:market-chart:${coinId}:${days}`,
      ttlMs: MARKET_CHART_CACHE_TTL_MS,
    }
  );

  return res.prices.map(([time, close]) => ({
    time: Math.floor(time / 1000),
    close,
  }));
};
