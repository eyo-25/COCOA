import {
  CoinChartDataType,
  CoinFilterdDataType,
  GetCoinDataType,
} from "@/common/types/data.type";

export const getChartData = (data: GetCoinDataType): CoinChartDataType[] => {
  if (!Array.isArray(data.Data)) return [];

  const filteredData = data.Data.filter(
    (item) => typeof item.RAW?.USD !== "undefined"
  ) as CoinFilterdDataType[];

  return filteredData.map((data) => {
    const { CoinInfo, RAW } = data;
    const { Id, FullName, Internal, ImageUrl } = CoinInfo;
    const { MKTCAP, SUPPLY, PRICE, OPENHOUR, OPEN24HOUR, OPENDAY } = RAW.USD;

    return {
      Id,
      FullName,
      Internal,
      ImageUrl,
      PRICE,
      OPENHOUR,
      OPEN24HOUR,
      OPENDAY,
      SUPPLY,
      MKTCAP,
    };
  });
};
