import useSWR from "swr";
import {
  CoinDetailDataType,
  GetCoinDataType,
  NewsDataType,
  OHLCVDataType,
  TimeType,
} from "../types/data.type";
import { timeTypeList } from "@/components/main/coinchart/CoinChart.data";
import axios from "axios";

export const fetchOHLCVData = async (
  timeType: TimeType,
  coinInternal: string
) => {
  const { type, limit, aggregate } = timeTypeList[timeType];

  const res = await axios.get<OHLCVDataType>(
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

  const filteredData = res.data.Data.Data.map((item) => {
    const { close, time } = item;
    return { close, time };
  });

  return filteredData;
};

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

export const useCoinInfo = (coinInternal: string) => {
  const { data, error, isLoading } = useSWR<CoinDetailDataType>(
    `${
      import.meta.env.VITE_API_URL +
      "/data/top/exchanges/full?fsym=" +
      coinInternal +
      "&tsym=USD&limit=1&api_key=" +
      import.meta.env.VITE_API_KEY
    }`
  );

  return { data, isLoading, error };
};

export const useCoinNews = (coinInternal: string) => {
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
