import {
  CoinChartDataType,
  CoinGeckoMarketDataType,
} from "@/common/types/data.type";

const getOpenPriceFromPercentage = (
  currentPrice: number,
  percentage?: number | null
) => {
  if (!percentage) return currentPrice;
  return currentPrice / (1 + percentage / 100);
};

export const getChartData = (data: unknown): CoinChartDataType[] => {
  if (!Array.isArray(data)) return [];

  return (data as CoinGeckoMarketDataType[]).map((coin) => {
    const {
      id,
      symbol,
      name,
      image,
      current_price,
      market_cap,
      circulating_supply,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
    } = coin;

    return {
      Id: id,
      FullName: name,
      Internal: symbol.toUpperCase(),
      ImageUrl: image,
      PRICE: current_price ?? 0,
      OPENHOUR: getOpenPriceFromPercentage(
        current_price ?? 0,
        price_change_percentage_1h_in_currency
      ),
      OPEN24HOUR: getOpenPriceFromPercentage(
        current_price ?? 0,
        price_change_percentage_24h_in_currency
      ),
      OPENDAY: getOpenPriceFromPercentage(
        current_price ?? 0,
        price_change_percentage_7d_in_currency
      ),
      SUPPLY: circulating_supply ?? 0,
      MKTCAP: market_cap ?? 0,
    };
  });
};
