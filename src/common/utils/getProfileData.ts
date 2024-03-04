import { CoinDetailDataType } from "../types/data.type";
import { calculateChangePercentage } from "./calculateChangePercentage";
import { koreanNumberFormatter } from "./koreanNumberFormatter";
import { priceFormatter } from "./priceFormatter";

export const getProfileData = (data: CoinDetailDataType) => {
  const { Id, FullName, Internal, ImageUrl, TotalCoinsMined } =
    data.Data.CoinInfo;
  const { PRICE, OPENHOUR, OPEN24HOUR } = data.Data.Exchanges[0];
  const { MKTCAP } = data.Data.AggregatedData;

  const formattedPrice = PRICE ? priceFormatter(PRICE) : "정보없음";
  const formattedMKTCAP = MKTCAP ? koreanNumberFormatter(MKTCAP) : "정보없음";
  const formattedSupply = TotalCoinsMined
    ? koreanNumberFormatter(TotalCoinsMined)
    : "정보없음";
  const openHourChange = calculateChangePercentage(OPENHOUR, PRICE);
  const open24HourChange = calculateChangePercentage(OPEN24HOUR, PRICE);

  const coinInfo = { Id, FullName, Internal, ImageUrl };
  const coinDetail = {
    PRICE: formattedPrice,
    SUPPLY: formattedSupply,
    MKTCAP: formattedMKTCAP,
    OPENHOUR: openHourChange,
    OPEN24HOUR: open24HourChange,
  };

  return { coinInfo, coinDetail };
};
