import {
  GraphMenuType,
  ChartMenuType,
  KoreanCoinNameType,
  TimeParamsType,
  ResponsiveType,
} from "@/common/types/data.type";

export const menuList = [
  {
    title: "시가총액",
    url: "/mktcapfull",
  },
  {
    title: "인기거래 목록",
    url: "/totaltoptiervolfull",
  },
  {
    title: "최근 거래량",
    url: "/totalvolfull",
  },
];
export const detailMenuList = [
  {
    title: "시세차트",
    url: "/exchanges",
  },
  {
    title: "관련 뉴스",
    url: "/",
  },
];

export const chartMenuList: ChartMenuType[] = [
  { type: "FullName", label: "암호화 화폐", className: "" },
  {
    type: "PRICE",
    label: "가격",
    className: "justify-end pr-[15px] text-gray-100",
  },
  {
    type: "OPENHOUR",
    label: "1H",

    className: "justify-center",
  },
  {
    type: "OPEN24HOUR",
    label: "24H",

    className: "justify-center",
  },
  {
    type: "OPENDAY",
    label: "1D",

    className: "justify-center",
  },
  {
    type: "SUPPLY",
    label: "총 공급량",

    className: "justify-center text-gray-100",
  },
  {
    type: "MKTCAP",
    label: "시가총액",

    className: "justify-center text-gray-100",
  },
];

export const chartSkeletonWidthList: { [Key in ResponsiveType]: number } = {
  max: 920,
  xl: 920,
  lg: 740,
  base: 770,
  sm: 540,
  xs: 460,
};
export const screenGridOffset: { [Key in ResponsiveType]: number } = {
  max: 7,
  xl: 6,
  lg: 5,
  base: 4,
  sm: 3,
  xs: 2,
};
export const chartWidthList: { [Key in ResponsiveType]: number[] } = {
  max: [26, 16.5, 11.5, 11.5, 11.5, 11.5, 11.5],
  xl: [28, 18, 13.5, 13.5, 13.5, 13.5],
  lg: [34.5, 22, 14.5, 14.5, 14.5],
  base: [40, 24, 18, 18],
  sm: [48, 30, 22],
  xs: [65, 35],
};
export const newsGridOffset: { [Key in ResponsiveType]: number } = {
  max: 3,
  xl: 3,
  lg: 3,
  base: 2,
  sm: 2,
  xs: 1,
};

export const timeTypeList: TimeParamsType = {
  hour: { type: "histominute", limit: 60, aggregate: 1 },
  day: { type: "histominute", limit: 144, aggregate: 10 },
  week: { type: "histohour", limit: 168, aggregate: 1 },
  month: { type: "histohour", limit: 120, aggregate: 6 },
};
export const graphDataList = {
  hour: { barWidth: 9, dateFormat: "HH:MM" },
  day: { barWidth: 3, dateFormat: "HH:MM" },
  week: { barWidth: 2, dateFormat: "YYYY-MM-DD" },
  month: { barWidth: 2, dateFormat: "YYYY-MM-DD" },
};

export const graphMenuList: GraphMenuType[] = [
  {
    timeType: "hour",
    title: "1 시간",
  },
  {
    timeType: "day",
    title: "24 시간",
  },
  {
    timeType: "week",
    title: "7 일",
  },
  {
    timeType: "month",
    title: "1 달",
  },
];

export const koreanCoinName: KoreanCoinNameType = {
  BTC: "비트코인",
  ETH: "이더리움",
  USDT: "테더",
  SOL: "솔라나",
  XRP: "리플",
  BNB: "바이낸스 코인",
  USDC: "유에스디씨 코인",
  STETH: "스테이크드 이더",
  ADA: "에이다",
  LINK: "체인링크",
  ARB: "알빗",
  TIA: "셀레스티아",
  SUI: "수이",
  AVAX: "아발란치",
  OP: "옵티미즘",
  DOGE: "도지코인",
  TRX: "트론",
  DOT: "폴카닷",
  APT: "압타스",
  MATIC: "매틱",
  WBTC: "랩트 비트코인",
  UNI: "유니스왑 프로토콜 토큰",
  ICP: "인터넷 컴퓨터",
  SEI: "세이",
  XLM: "스텔라",
  SHIB: "시바이누",
  LTC: "라이트코인",
  DYM: "디멘션",
  ENS: "이더리움 네임 서비스",
  MANTA: "만타 네트워크",
  ETC: "이더리움 클래식",
  BCH: "비트코인 캐쉬",
  FIL: "파일코인",
  XMR: "모네로",
  WLD: "월드코인",
  FDUSD: "퍼스트디지털USD",
  POL: "폴리곤 에코시스템 토큰",
};
