export type detailChartMenu = {
  title: string;
  info: "PRICE" | "MKTCAP" | "SUPPLY";
};
export type detailChartInfo = {
  title: string;
  info: "OPENHOUR" | "OPEN24HOUR" | "OPENWEEK" | "OPENMONTH";
};

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
  Message: string;
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
    OPENWEEK: number;
    OPENMONTH: number;
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
  MKTCAP: number;
  SUPPLY: number;
  PRICE: number;
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
  className: string;
}
export interface MenuType {
  title: string;
  url: string;
}
export interface FormattenChartType {
  PRICE: string;
  OPENHOUR: JSX.Element;
  OPEN24HOUR: JSX.Element;
  OPENDAY: JSX.Element;
  SUPPLY: string;
  MKTCAP: string;
  Id: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
}

export interface WebsocketDataType {
  FROMSYMBOL: string;
  PRICE?: number;
}

export type TimeType = "hour" | "day" | "week" | "month";
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
  Message: string;
  Response: string;
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

export interface CustomError {
  message: string;
  type: string;
}

export type timeDataType = {
  week: number;
  month: number;
};

export type ResponsiveType = "xs" | "sm" | "base" | "lg" | "xl" | "max";
