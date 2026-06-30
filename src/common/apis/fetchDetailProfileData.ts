import { CoinGeckoCoinDetailDataType } from "../types/data.type";
import { getProfileData } from "../utils/getProfileData";
import { cachedJsonFetch } from "../utils/cachedJsonFetch";
import {
  COINGECKO_API_URL,
  getCoinGeckoApiKeyParam,
  getCoinGeckoId,
} from "./coinGecko";

const DETAIL_PROFILE_CACHE_TTL_MS = 1000 * 60 * 5;

export const fetchDetailProfileData = async (
  coinInternal: string,
  fetcher?: typeof fetch
) => {
  try {
    const coinId = getCoinGeckoId(coinInternal);
    const params = `localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false${getCoinGeckoApiKeyParam()}`;
    const detailData = await cachedJsonFetch<CoinGeckoCoinDetailDataType>(
      `${COINGECKO_API_URL}/coins/${coinId}?${params}`,
      {
        cacheKey: `coin-gecko:coin-detail:${coinId}`,
        ttlMs: DETAIL_PROFILE_CACHE_TTL_MS,
        fetcher,
      }
    );

    return getProfileData(detailData);
  } catch (error: unknown) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error("An unexpected error occurred");
  }
};
