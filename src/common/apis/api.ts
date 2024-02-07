import useSWR from "swr";
import { GetCoinDataType } from "../types/data.type";

export const useCoinTrends = (trendType: string) => {
  const { data, error, isLoading } = useSWR<GetCoinDataType>(
    `${
      import.meta.env.VITE_BASE_URL +
      "/data/top" +
      trendType +
      "?limit=30&tsym=KRW&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};
