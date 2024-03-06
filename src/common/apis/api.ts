import useSWR from "swr";
import { NewsDataType } from "../types/data.type";

export const useCoinCategoriesNews = (coinInternal: string) => {
  const { data, error, isLoading } = useSWR<NewsDataType>(
    `${
      import.meta.env.VITE_API_URL +
      "/data/v2/news/?categories=" +
      coinInternal +
      "&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};

export const useCoinFeedsNews = (feed: string) => {
  const url =
    feed !== "latestnews"
      ? `${
          import.meta.env.VITE_API_URL +
          "/data/v2/news/?feeds=" +
          feed +
          "&api_key=" +
          import.meta.env.VITE_API_KEY
        }`
      : `${
          import.meta.env.VITE_API_URL +
          "/data/v2/news/?lang=EN&api_key=" +
          import.meta.env.VITE_API_KEY
        }`;

  const { data, error, isLoading } = useSWR<NewsDataType>(url);

  return { data, error, isLoading };
};
