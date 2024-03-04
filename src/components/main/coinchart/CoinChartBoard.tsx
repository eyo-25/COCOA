import {
  CoinChartDataType,
  FormattenChartType,
} from "@/common/types/data.type";
import { chartMenuList, koreanCoinName } from "./CoinChart.data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { priceFormatter } from "@/common/utils/priceFormatter";
import { koreanNumberFormatter } from "@/common/utils/koreanNumberFormatter";
import { calculateChangePercentage } from "@/common/utils/calculateChangePercentage";
import { formatPercentageElement } from "@/common/utils/formatPercentageElement";

type Props = {
  chartData: CoinChartDataType[];
};

function CoinChartBoard({ chartData }: Props) {
  const [formattedChart, SetFormattedChart] = useState<FormattenChartType[]>(
    []
  );

  useEffect(() => {
    const formattedChart = chartData.map((data) => {
      const { PRICE, OPENHOUR, OPEN24HOUR, OPENDAY, SUPPLY, MKTCAP } = data;

      const formattedPrice = priceFormatter(PRICE);
      const formattedMKTCAP = koreanNumberFormatter(MKTCAP);
      const formattedSupply = koreanNumberFormatter(SUPPLY);
      const openHourChange = calculateChangePercentage(OPENHOUR, PRICE);
      const open24HourChange = calculateChangePercentage(OPEN24HOUR, PRICE);
      const openDayChange = calculateChangePercentage(OPENDAY, PRICE);

      return {
        ...data,
        PRICE: formattedPrice,
        OPENHOUR: formatPercentageElement(openHourChange),
        OPEN24HOUR: formatPercentageElement(open24HourChange),
        OPENDAY: formatPercentageElement(openDayChange),
        SUPPLY: formattedSupply,
        MKTCAP: formattedMKTCAP,
      };
    });

    SetFormattedChart(formattedChart);
  }, [chartData]);

  const nameTd = (coin: FormattenChartType) => {
    return (
      <div className="flex items-center ml-2">
        <div className="flex w-8 h-8 mr-2 overflow-hidden rounded-full">
          <img
            data-testid="coin-icon"
            src={import.meta.env.VITE_BASE_URL + coin.ImageUrl}
            alt={coin.FullName}
          />
        </div>
        <p className="mr-[6px] font-bold text-gray-100">
          {koreanCoinName[coin.Internal] || coin.FullName}
        </p>
        <p className="text-xs text-gray-200">{coin.Internal}</p>
      </div>
    );
  };

  const navigate = useNavigate();
  const onClickHandler = (coinInteranl: string) => {
    navigate(`/assets/${coinInteranl}`);
  };

  return (
    <table className="flex flex-col w-full h-full">
      <thead>
        <tr className="flex w-full mt-5 mb-3">
          {chartMenuList.map(({ label, width }) => (
            <th className="t-menu" style={{ width: `${width}%` }} key={label}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="flex flex-col w-full">
        {formattedChart.map((coin, index) => (
          <tr
            key={index}
            onClick={() => onClickHandler(coin.Internal)}
            className="flex w-full py-2 rounded-lg cursor-pointer hover:bg-gray-500/30"
          >
            {chartMenuList.map(({ type, width, className }) => (
              <td
                className={`flex items-center ${
                  type !== "Name" && "border-r border-gray-500"
                } ${className}`}
                style={{ width: `${width}%` }}
                key={type}
              >
                {type === "Name" ? nameTd(coin) : coin?.[type]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoinChartBoard;
