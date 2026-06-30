import { CoinChartDataType } from "../types/data.type";

const BINANCE_API_URL = "https://api.binance.com/api/v3";
const BINANCE_STREAM_URL = "wss://stream.binance.com:9443/stream";
const BINANCE_EXCHANGE_INFO_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const BINANCE_USDT_SYMBOLS_CACHE_KEY = "binance:usdt-spot-symbols";

type BinanceExchangeInfoResponse = {
  symbols: {
    symbol: string;
    status: string;
    baseAsset: string;
    quoteAsset: string;
    isSpotTradingAllowed: boolean;
  }[];
};

export type BinanceTickerMessage = {
  stream?: string;
  data?: {
    s?: string;
    c?: string;
    o?: string;
  };
};

type BinanceSymbolsCacheEntry = {
  expiresAt: number;
  data: string[];
};

const getCachedBinanceSymbols = () => {
  const cached = localStorage.getItem(BINANCE_USDT_SYMBOLS_CACHE_KEY);
  if (!cached) return null;

  try {
    const entry = JSON.parse(cached) as BinanceSymbolsCacheEntry;
    if (Date.now() < entry.expiresAt) return new Set(entry.data);
  } catch {
    localStorage.removeItem(BINANCE_USDT_SYMBOLS_CACHE_KEY);
  }

  return null;
};

const setCachedBinanceSymbols = (symbols: string[]) => {
  localStorage.setItem(
    BINANCE_USDT_SYMBOLS_CACHE_KEY,
    JSON.stringify({
      expiresAt: Date.now() + BINANCE_EXCHANGE_INFO_CACHE_TTL_MS,
      data: symbols,
    })
  );
};

export const fetchBinanceUsdtSpotSymbols = async (fetcher?: typeof fetch) => {
  const cachedSymbols = getCachedBinanceSymbols();
  if (cachedSymbols) return cachedSymbols;

  const response = await (fetcher ?? fetch)(`${BINANCE_API_URL}/exchangeInfo`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = (await response.json()) as BinanceExchangeInfoResponse;

  const symbols = data.symbols
    .filter(
      ({ status, quoteAsset, isSpotTradingAllowed }) =>
        status === "TRADING" && quoteAsset === "USDT" && isSpotTradingAllowed
    )
    .map(({ symbol }) => symbol);

  setCachedBinanceSymbols(symbols);

  return new Set(symbols);
};

export const getBinanceUsdtTickerStreams = (
  coins: CoinChartDataType[],
  binanceSymbols: Set<string>
) => {
  return coins
    .map(({ Internal }) => `${Internal.toUpperCase()}USDT`)
    .filter((symbol) => binanceSymbols.has(symbol))
    .map((symbol) => `${symbol.toLowerCase()}@ticker`);
};

export const getBinanceCombinedStreamUrl = (streams: string[]) => {
  if (streams.length <= 0) return null;

  return `${BINANCE_STREAM_URL}?streams=${streams.join("/")}`;
};
