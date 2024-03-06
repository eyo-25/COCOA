import { detailChartInfo, detailChartMenu } from "@/common/types/data.type";

export const detailChartMenuList: detailChartMenu[] = [
  { title: "가격", info: "PRICE" },
  { title: "시가총액", info: "MKTCAP" },
  { title: "총 발행량", info: "SUPPLY" },
];
export const detailChartInfoList: detailChartInfo[] = [
  { title: "1 hour", info: "OPENHOUR" },
  { title: "24 hour", info: "OPEN24HOUR" },
  { title: "week", info: "OPENWEEK" },
  { title: "month", info: "OPENMONTH" },
];
