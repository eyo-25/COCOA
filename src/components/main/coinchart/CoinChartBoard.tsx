import { CoinChartDataType } from "@/common/types/data.type";
import { chartMenuList, koreanCoinName } from "./CoinChart.data";

type Props = {
  chartData: CoinChartDataType[];
};

function CoinChartBoard({ chartData }: Props) {
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
        {chartData.map((coin, index) => (
          <tr key={index} className="flex w-full my-2">
            {chartMenuList.map(({ type, width, className }) => {
              const nameTd = (
                <div className="flex items-center">
                  <div className="flex w-8 h-8 mr-2 overflow-hidden rounded-full">
                    <img
                      src={`https://www.cryptocompare.com/${coin.ImageUrl}`}
                      alt={coin.FullName}
                    />
                  </div>
                  <p className="mr-[6px] font-bold text-gray-100">
                    {koreanCoinName[coin.Internal] || coin.FullName}
                  </p>
                  <p className="text-xs text-gray-200">{coin.Internal}</p>
                </div>
              );

              return (
                <td
                  className={`flex items-center ${className}`}
                  style={{ width: `${width}%` }}
                >
                  {type === "Name" ? nameTd : coin?.[type]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoinChartBoard;
