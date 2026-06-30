import {
  CoinDetailInfoType,
  CoinGeckoCoinDetailDataType,
} from "../types/data.type";
import { koreanNumberFormatter } from "./koreanNumberFormatter";
import { priceFormatter } from "./priceFormatter";

export const getProfileData = (
  detailData: CoinGeckoCoinDetailDataType
): CoinDetailInfoType => {
  const {
    id,
    name,
    symbol,
    image,
    market_data: {
      current_price,
      market_cap,
      circulating_supply,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      price_change_percentage_30d_in_currency,
    },
  } = detailData;
  const price = current_price.usd;
  const marketCap = market_cap.usd;

  const formattedPrice = price ? priceFormatter(price) : "정보없음";
  const formattedMKTCAP = marketCap
    ? koreanNumberFormatter(marketCap)
    : "정보없음";
  const formattedSupply = circulating_supply
    ? koreanNumberFormatter(circulating_supply)
    : "정보없음";

  const coinInfo = {
    Id: id,
    FullName: name,
    Internal: symbol.toUpperCase(),
    ImageUrl: image.large ?? image.small ?? image.thumb ?? "",
  };
  const coinDetail = {
    PRICE: formattedPrice,
    SUPPLY: formattedSupply,
    MKTCAP: formattedMKTCAP,
    OPENHOUR: price_change_percentage_1h_in_currency?.usd ?? 0,
    OPEN24HOUR: price_change_percentage_24h_in_currency?.usd ?? 0,
    OPENWEEK: price_change_percentage_7d_in_currency?.usd ?? 0,
    OPENMONTH: price_change_percentage_30d_in_currency?.usd ?? 0,
  };

  return { coinInfo, coinDetail };
};
