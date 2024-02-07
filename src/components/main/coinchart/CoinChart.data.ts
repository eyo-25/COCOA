import { ChartMenuType } from "@/common/types/data.type";

export const menuList = [
  {
    title: "시가총액",
    url: "/mktcapfull",
  },
  {
    title: "상위티어 거래량",
    url: "/totaltoptiervolfull",
  },
  {
    title: "최근 거래량",
    url: "/totalvolfull",
  },
  {
    title: "총 거래량",
    url: "/volumes",
  },
];

export const chartMenuList: ChartMenuType[] = [
  { type: "Name", label: "암호화 화폐", width: 30, className: "" },
  {
    type: "PRICE",
    label: "가격",
    width: 18,
    className: "justify-end text-gray-100",
  },
  { type: "OPENHOUR", label: "1H", width: 10, className: "justify-center" },
  { type: "OPEN24HOUR", label: "24H", width: 10, className: "justify-center" },
  { type: "OPENDAY", label: "1D", width: 10, className: "justify-center" },
  {
    type: "SUPPLY",
    label: "총 공급량",
    width: 11,
    className: "justify-center text-gray-100",
  },
  {
    type: "MKTCAP",
    label: "시가총액",
    width: 11,
    className: "justify-center text-gray-100",
  },
];

type KoreanCoinNameType = {
  [key: string]: string;
};
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
};
