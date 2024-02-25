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

interface ExtendCoininfoType extends CoininfoType {
  TotalCoinsMined: number;
}

export interface CoinDetailDataType {
  Response: string;
  Data: {
    CoinInfo: ExtendCoininfoType;
    AggregatedData: { MKTCAP: number };
    Exchanges: {
      MKTCAP?: number;
      PRICE: number;
      OPENHOUR: number;
      OPEN24HOUR: number;
    }[];
  };
}
export interface CoinDetailInfoType {
  coinInfo: CoininfoType;
  coinDetail: {
    PRICE: string;
    SUPPLY: string;
    MKTCAP: string;
    OPENHOUR: number;
    OPEN24HOUR: number;
  };
}

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
export interface MenuType {
  title: string;
  url: string;
}

export interface WebsocketDataType {
  FROMSYMBOL: string;
  PRICE?: number;
}

export type TimeType = "hour" | "day" | "week" | "month" | "monthDay";
export type TimeHistory = "histominute" | "histohour" | "histoday";
export type TimeParamsType = {
  [Key in TimeType]: {
    type: TimeHistory;
    limit: number;
    aggregate: number;
  };
};
export interface GraphMenuType {
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

interface NewsType {
  id: string;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  categories: string;
  source: string;
}
export interface NewsDataType {
  Data: NewsType[];
}
export interface NewsListType {
  id: string;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  tags: string[];
  categories: string;
  source: string;
}
