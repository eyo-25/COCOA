type detailChartMenu = {
  title: string;
  info: "PRICE" | "MKTCAP" | "SUPPLY";
};

type detailChartInfo = {
  title: string;
  info: "OPENHOUR" | "OPEN24HOUR" | "SUPPLY" | "week" | "month";
};

export const detailChartMenuList: detailChartMenu[] = [
  { title: "가격", info: "PRICE" },
  { title: "시가총액", info: "MKTCAP" },
  { title: "총 발행량", info: "SUPPLY" },
];

export const detailChartInfoList: detailChartInfo[] = [
  { title: "1 hour", info: "OPENHOUR" },
  { title: "24 hour", info: "OPEN24HOUR" },
  { title: "week", info: "week" },
  { title: "month", info: "month" },
];
