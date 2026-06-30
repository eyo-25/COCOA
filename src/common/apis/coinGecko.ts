export const COINGECKO_API_URL =
  import.meta.env.VITE_COINGECKO_API_URL ?? "/api/coingecko";
const DEFAULT_COINGECKO_DEMO_API_KEY = "CG-5AbdGMpgfKfedcsttTyehzMN";

export const getCoinGeckoApiKeyParam = (prefix: "?" | "&" = "&") => {
  const apiKey =
    import.meta.env.VITE_COINGECKO_API_KEY ?? DEFAULT_COINGECKO_DEMO_API_KEY;
  return apiKey ? `${prefix}x_cg_demo_api_key=${apiKey}` : "";
};

const coinSymbolToId: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  SOL: "solana",
  XRP: "ripple",
  BNB: "binancecoin",
  USDC: "usd-coin",
  ADA: "cardano",
  DOGE: "dogecoin",
  TRX: "tron",
  DOT: "polkadot",
  LINK: "chainlink",
  AVAX: "avalanche-2",
  MATIC: "matic-network",
  POL: "polygon-ecosystem-token",
  LTC: "litecoin",
  BCH: "bitcoin-cash",
};

export const getCoinGeckoId = (coinIdOrSymbol: string) => {
  return coinSymbolToId[coinIdOrSymbol.toUpperCase()] ?? coinIdOrSymbol;
};
