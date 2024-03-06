import useSWR from "swr";
import { GetCoinDataType } from "../types/data.type";

export const useCoinTrends = (trendType: string, limit: number = 25) => {
  const { data, error, isLoading } = useSWR<GetCoinDataType>(
    `${
      import.meta.env.VITE_API_URL +
      "/data/top" +
      trendType +
      "?limit=" +
      limit +
      "&tsym=USD&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};
