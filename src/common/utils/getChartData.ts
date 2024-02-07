import {
  CoinChartDataType,
  CoinFilterdDataType,
  GetCoinDataType,
} from "@/common/types/data.type";
import { priceFormatter } from "./priceFormatter";
import { calculateChangePercentage } from "./calculateChangePercentage";
import { formatKoreanNumber } from "./formatKoreanNumber";

export const getChartData = (data: GetCoinDataType): CoinChartDataType[] => {
  const filteredData = data.Data.filter(
    (item) => typeof item.RAW !== "undefined"
  ) as CoinFilterdDataType[];

  return filteredData.map((data) => {
    const { CoinInfo, RAW } = data;
    const { Id, FullName, Internal, ImageUrl } = CoinInfo;
    const { LASTUPDATE, MKTCAP, SUPPLY, PRICE, OPENHOUR, OPEN24HOUR, OPENDAY } =
      RAW.KRW;

    const formattedPrice = priceFormatter(PRICE);
    const formattedMKTCAP = formatKoreanNumber(MKTCAP);
    const formattedSupply = formatKoreanNumber(SUPPLY);
    const openHourChange = calculateChangePercentage(OPENHOUR, PRICE);
    const open24HourChange = calculateChangePercentage(OPEN24HOUR, PRICE);
    const openDayChange = calculateChangePercentage(OPENDAY, PRICE);

    return {
      Id,
      FullName,
      Internal,
      ImageUrl,
      LASTUPDATE,
      PRICE: formattedPrice,
      OPENHOUR: openHourChange,
      OPEN24HOUR: open24HourChange,
      OPENDAY: openDayChange,
      SUPPLY: formattedSupply,
      MKTCAP: formattedMKTCAP,
    };
  });
};
