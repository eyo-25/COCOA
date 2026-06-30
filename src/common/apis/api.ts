import useSWR from "swr";
import { NewsDataType } from "../types/data.type";

const CRYPTOCOMPARE_API_URL =
  import.meta.env.VITE_CRYPTOCOMPARE_API_URL ??
  import.meta.env.VITE_API_URL ??
  "https://min-api.cryptocompare.com";
const CRYPTOCOMPARE_API_KEY =
  import.meta.env.VITE_CRYPTOCOMPARE_API_KEY ?? import.meta.env.VITE_API_KEY;

export const getCoinCategoriesNewsUrl = (coinInternal: string) => {
  const params = new URLSearchParams({ categories: coinInternal });
  if (CRYPTOCOMPARE_API_KEY) params.set("api_key", CRYPTOCOMPARE_API_KEY);

  return `${CRYPTOCOMPARE_API_URL}/data/v2/news/?${params.toString()}`;
};

export const getCoinFeedsNewsUrl = (feed: string) => {
  const params =
    feed !== "latestnews"
      ? new URLSearchParams({ feeds: feed })
      : new URLSearchParams({ lang: "EN" });

  if (CRYPTOCOMPARE_API_KEY) params.set("api_key", CRYPTOCOMPARE_API_KEY);

  return `${CRYPTOCOMPARE_API_URL}/data/v2/news/?${params.toString()}`;
};

export const useCoinCategoriesNews = (coinInternal: string) => {
  const { data, error, isLoading } = useSWR<NewsDataType>(
    getCoinCategoriesNewsUrl(coinInternal)
  );

  return { data, isLoading, error };
};

export const useCoinFeedsNews = (feed: string) => {
  const url = getCoinFeedsNewsUrl(feed);

  const { data, error, isLoading } = useSWR<NewsDataType>(url);

  return { data, error, isLoading };
};
