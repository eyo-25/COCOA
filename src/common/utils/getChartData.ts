import {
  CoinChartDataType,
  CoinFilterdDataType,
  GetCoinDataType,
  WebsocketDataType,
} from "@/common/types/data.type";
import { priceFormatter } from "./priceFormatter";
import { calculateChangePercentage } from "./calculateChangePercentage";
import { formatKoreanNumber } from "./formatKoreanNumber";

export const getChartData = (
  data: GetCoinDataType,
  exchangeData?: WebsocketDataType
): CoinChartDataType[] => {
  const filteredData = data.Data.filter(
    (item) => typeof item.RAW !== "undefined"
  ) as CoinFilterdDataType[];

  return filteredData.map((data) => {
    const { CoinInfo, RAW } = data;
    const { Id, FullName, Internal, ImageUrl } = CoinInfo;
    const { MKTCAP, SUPPLY, PRICE, OPENHOUR, OPEN24HOUR, OPENDAY } = RAW.USD;

    let price = PRICE;

    if (
      exchangeData !== undefined &&
      exchangeData.PRICE &&
      data.CoinInfo.Internal === exchangeData.FROMSYMBOL
    ) {
      price = exchangeData.PRICE;
    }

    const formattedPrice = priceFormatter(price);
    const formattedMKTCAP = formatKoreanNumber(MKTCAP);
    const formattedSupply = formatKoreanNumber(SUPPLY);
    const openHourChange = calculateChangePercentage(OPENHOUR, price);
    const open24HourChange = calculateChangePercentage(OPEN24HOUR, price);
    const openDayChange = calculateChangePercentage(OPENDAY, price);

    return {
      Id,
      FullName,
      Internal,
      ImageUrl,
      PRICE: formattedPrice,
      OPENHOUR: openHourChange,
      OPEN24HOUR: open24HourChange,
      OPENDAY: openDayChange,
      SUPPLY: formattedSupply,
      MKTCAP: formattedMKTCAP,
    };
  });
};
