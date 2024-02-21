export type CoininfoType = {
  Id: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
};
type RawType = {
  MKTCAP: number;
  SUPPLY: number;
  PRICE: number;
  OPENHOUR: number;
  OPEN24HOUR: number;
  OPENDAY: number;
};

export interface CoinDataType {
  CoinInfo: CoininfoType;
  RAW?: {
    USD: RawType;
  };
}
export interface GetCoinDataType {
  Data: CoinDataType[];
}
export interface CoinFilterdDataType {
  CoinInfo: CoininfoType;
  RAW: {
    USD: RawType;
  };
}
export interface CoinChartDataType extends CoininfoType {
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

export type TimeType = "hour" | "day" | "week" | "month";
export type TimeHistory = "histominute" | "histohour";
export type TimeParamsType = {
  [Key in TimeType]: {
    type: TimeHistory;
    limit: number;
    aggregate: number;
  };
};
export interface BannerMenuType {
  timeType: TimeType;
  title: string;
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

export type PercentType = "OPENHOUR" | "OPEN24HOUR" | "OPENDAY";
