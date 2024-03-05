import {
  CoinDetailDataType,
  CoinDetailInfoType,
  OHLCVType,
} from "../types/data.type";
import { calculateChangePercentage } from "./calculateChangePercentage";
import { koreanNumberFormatter } from "./koreanNumberFormatter";
import { priceFormatter } from "./priceFormatter";

export const getProfileData = (
  detailData: CoinDetailDataType,
  OHLCVTData: OHLCVType[]
): CoinDetailInfoType => {
  const { Id, FullName, Internal, ImageUrl, TotalCoinsMined } =
    detailData.Data.CoinInfo;
  const { PRICE, OPENHOUR, OPEN24HOUR } = detailData.Data.Exchanges[0];
  const { MKTCAP } = detailData.Data.AggregatedData;

  const formattedPrice = PRICE ? priceFormatter(PRICE) : "정보없음";
  const formattedMKTCAP = MKTCAP ? koreanNumberFormatter(MKTCAP) : "정보없음";
  const formattedSupply = TotalCoinsMined
    ? koreanNumberFormatter(TotalCoinsMined)
    : "정보없음";
  const openHourChange = calculateChangePercentage(OPENHOUR, PRICE);
  const open24HourChange = calculateChangePercentage(OPEN24HOUR, PRICE);
  const openWeek = calculateChangePercentage(
    OHLCVTData[24].close,
    OHLCVTData[30].close
  );
  const openMonth = calculateChangePercentage(
    OHLCVTData[0].close,
    OHLCVTData[30].close
  );

  const coinInfo = {
    Id,
    FullName,
    Internal,
    ImageUrl,
  };
  const coinDetail = {
    PRICE: formattedPrice,
    SUPPLY: formattedSupply,
    MKTCAP: formattedMKTCAP,
    OPENHOUR: openHourChange,
    OPEN24HOUR: open24HourChange,
    OPENWEEK: openWeek,
    OPENMONTH: openMonth,
  };

  return { coinInfo, coinDetail };
};
