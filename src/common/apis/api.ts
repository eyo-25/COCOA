import useSWR from "swr";
import {
  GetCoinDataType,
  OHLCVDataType,
  TimeType,
  TimeTypeDataType,
} from "../types/data.type";

const timeTypeList: TimeTypeDataType = {
  day: { type: "histoday", limit: 7, aggregate: 0 },
  hour: { type: "histominute", limit: 60, aggregate: 1 },
  minute: { type: "histominute", limit: 60, aggregate: 0 },
};

export const useCoinOHLCV = (timeType: TimeType, coinInternal: string) => {
  const { data, error, isLoading } = useSWR<OHLCVDataType>(
    `${
      import.meta.env.VITE_BASE_URL +
      "/data/v2/" +
      timeTypeList[timeType].type +
      "?fsym=" +
      coinInternal +
      "&tsym=USD&limit=" +
      timeTypeList[timeType].limit +
      "&aggregate=" +
      timeTypeList[timeType].aggregate +
      "&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};

export const useCoinTrends = (trendType: string) => {
  const { data, error, isLoading } = useSWR<GetCoinDataType>(
    `${
      import.meta.env.VITE_BASE_URL +
      "/data/top" +
      trendType +
      "?limit=25&tsym=USD&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};
