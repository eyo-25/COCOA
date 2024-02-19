import useSWR from "swr";
import { GetCoinDataType, OHLCVDataType, TimeType } from "../types/data.type";
import { timeTypeList } from "@/components/main/coinchart/CoinChart.data";

export const useCoinOHLCV = (timeType: TimeType, coinInternal: string) => {
  const { type, limit, aggregate } = timeTypeList[timeType];

  const { data, error, isLoading } = useSWR<OHLCVDataType>(
    `${
      import.meta.env.VITE_API_URL +
      "/data/v2/" +
      type +
      "?fsym=" +
      coinInternal +
      "&tsym=USD&limit=" +
      limit +
      "&aggregate=" +
      aggregate +
      "&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};

export const useCoinTrends = (trendType: string) => {
  const { data, error, isLoading } = useSWR<GetCoinDataType>(
    `${
      import.meta.env.VITE_API_URL +
      "/data/top" +
      trendType +
      "?limit=25&tsym=USD&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};
