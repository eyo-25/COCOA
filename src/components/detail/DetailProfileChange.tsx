import { CoinDetailInfoType } from "@/common/types/data.type";
import CoinTitle from "../ui/CoinTitle";
import {
  detailChartInfoList,
  detailChartMenuList,
  timeDataType,
} from "./Detail.data";
import { formatPercentageElement } from "@/common/utils/formatPercentageElement";

type Props = {
  coinInfo: CoinDetailInfoType;
  timeData: timeDataType;
};

function DetailProfileChange({ coinInfo, timeData }: Props) {
  const timerData = detailChartInfoList.map(({ title, info }) => {
    let change = <></>;
    if (info === "OPENHOUR" || info === "OPEN24HOUR") {
      change = formatPercentageElement(coinInfo.coinDetail[info]);
    } else if (info === "week" || info === "month") {
      change = formatPercentageElement(timeData[info]);
    }

    return { title, change };
  });

  return (
    <>
      <div className="mb-[25px]">
        <CoinTitle displayCoin={coinInfo.coinInfo} />
      </div>
      <ul className="flex mb-8">
        {detailChartMenuList.map(({ title, info }) => (
          <li
            key={title}
            className="relative flex flex-col items-center w-[200px]"
          >
            <h4 className="text-gray-200">{title}</h4>
            <p className="text-gray-100">{coinInfo.coinDetail[info]}</p>
            <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500 last:border-r"></div>
          </li>
        ))}
      </ul>
      <ul className="flex gap-5">
        {timerData.map(({ title, change }) => (
          <li
            key={title}
            className="flex justify-between items-center rounded-sm px-5 h-[35px] w-[190px] bg-gray-600"
          >
            <p>{title}</p>
            {change}
          </li>
        ))}
      </ul>
    </>
  );
}
export default DetailProfileChange;
