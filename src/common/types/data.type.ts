type Coininfo = {
  Id: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
};
type Raw = {
  MKTCAP: number;
  LASTUPDATE: number;
  SUPPLY: number;
  PRICE: number;
  OPENHOUR: number;
  OPEN24HOUR: number;
  OPENDAY: number;
};

export interface CoinDataType {
  CoinInfo: Coininfo;
  RAW?: {
    KRW: Raw;
  };
}
export interface GetCoinDataType {
  Data: CoinDataType[];
}
export interface CoinFilterdDataType {
  CoinInfo: Coininfo;
  RAW: {
    KRW: Raw;
  };
}
export interface CoinChartDataType extends Coininfo {
  MKTCAP: string;
  LASTUPDATE: number;
  SUPPLY: string;
  PRICE: string;
  OPENHOUR: string;
  OPEN24HOUR: string;
  OPENDAY: string;
}

type ChartMenu =
  | "Name"
  | "PRICE"
  | "OPENHOUR"
  | "OPEN24HOUR"
  | "OPENDAY"
  | "SUPPLY"
  | "MKTCAP";
export type ChartMenuType = {
  type: ChartMenu;
  label: string;
  width: number;
  className: string;
};
