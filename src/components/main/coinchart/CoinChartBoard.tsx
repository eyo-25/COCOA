import { motion } from "framer-motion";
import {
  CoinChartDataType,
  FormattenChartType,
  ResponsiveType,
} from "@/common/types/data.type";
import {
  chartMenuList,
  chartWidthList,
  koreanCoinName,
  screenGridOffset,
} from "./CoinChart.data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { priceFormatter } from "@/common/utils/priceFormatter";
import { koreanNumberFormatter } from "@/common/utils/koreanNumberFormatter";
import { calculateChangePercentage } from "@/common/utils/calculateChangePercentage";
import { formatPercentageElement } from "@/common/utils/formatPercentageElement";

const priceVariants = {
  normal: {
    background: "#999",
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

type Props = {
  chartData: CoinChartDataType[];
  screenSize: ResponsiveType;
};

function CoinChartBoard({ chartData, screenSize }: Props) {
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
        <div className="flex w-8 h-8 mr-2 overflow-hidden rounded-full mini:w-7 mini:h-7 mobile:w-6 mobile:h-6">
          <img
            data-testid="coin-icon"
            src={import.meta.env.VITE_BASE_URL + coin.ImageUrl}
            alt={coin.FullName}
          />
        </div>
        <h4 className="mr-[6px] font-bold text-gray-100">
          {koreanCoinName[coin.Internal] || coin.FullName}
        </h4>
        <p className="text-xs text-gray-200">{coin.Internal}</p>
      </div>
    );
  };

  const navigate = useNavigate();
  const onClickHandler = (coinInteranl: string) => {
    navigate(`/assets/${coinInteranl}`);
  };

  return (
    <tbody className="flex flex-col w-full">
      {formattedChart.map((coin, index) => (
        <tr
          key={index}
          onClick={() => onClickHandler(coin.Internal)}
          className="flex w-full py-2 overflow-hidden rounded-lg cursor-pointer hover:bg-gray-500/30"
        >
          {chartMenuList
            .slice(0, screenGridOffset[screenSize])
            .map(({ type, className }, i) => (
              <motion.td
                className={`relative overflow-hidden flex items-center ${
                  type !== "FullName" && "border-r border-gray-500"
                } ${className}`}
                style={{
                  width: `${chartWidthList[screenSize][i]}%`,
                }}
                key={type}
              >
                {type === "FullName" ? nameTd(coin) : coin?.[type]}
                {type === "PRICE" && (
                  <motion.div
                    variants={priceVariants}
                    initial="normal"
                    animate="animate"
                    className="absolute w-full h-full rounded-md opacity-15"
                    key={String(coin[type])}
                  ></motion.div>
                )}
              </motion.td>
            ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CoinChartBoard;
