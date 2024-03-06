import { timeTypeList } from "@/components/main/coinchart/CoinChart.data";
import { OHLCVDataType, TimeType } from "../types/data.type";
import { fetchAxios } from "../utils/fetchAxios";

export const fetchOHLCVData = async (
  timeType: TimeType,
  coinInternal: string
) => {
  const { type, limit, aggregate } = timeTypeList[timeType];

  const res = await fetchAxios<OHLCVDataType>(
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

  const filteredData = res.Data.Data.map((item) => {
    const { close, time } = item;
    return { close, time };
  });

  return filteredData;
};
