type Coininfo = {
  Id: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
};
type Raw = {
  MKTCAP: number;
  SUPPLY: number;
  PRICE: number;
  OPENHOUR: number;
  OPEN24HOUR: number;
  OPENDAY: number;
};

export interface CoinDataType {
  CoinInfo: Coininfo;
  RAW?: {
    USD: Raw;
  };
}
export interface GetCoinDataType {
  Data: CoinDataType[];
}
export interface CoinFilterdDataType {
  CoinInfo: Coininfo;
  RAW: {
    USD: Raw;
  };
}
export interface CoinChartDataType extends Coininfo {
  MKTCAP: string;
  SUPPLY: string;
  PRICE: string;
  OPENHOUR: number;
  OPEN24HOUR: number;
  OPENDAY: number;
}

export type ChartMenu =
  | "Name"
  | "PRICE"
  | "OPENHOUR"
  | "OPEN24HOUR"
  | "OPENDAY"
  | "SUPPLY"
  | "MKTCAP";
export interface ChartMenuType {
  type: ChartMenu;
  label: string;
  width: number;
  className: string;
}

export interface WebsocketDataType {
  FROMSYMBOL: string;
  PRICE?: number;
}

export type TimeType = "hour" | "day" | "minute";
export interface TimeTypeDataType {
  hour: { type: "histominute"; limit: number; aggregate: number };
  day: { type: "histoday"; limit: number; aggregate: number };
  minute: { type: "histominute"; limit: number; aggregate: number };
}

export interface OHLCVType {
  time: number;
  close: number;
}

export interface OHLCVDataType {
  Data: {
    Data: OHLCVType[];
  };
}

export type KoreanCoinNameType = {
  [key: string]: string;
};
