import { TimeType } from "@/common/types/data.type";
import { graphMenuList } from "../coinchart/CoinChart.data";

type Props = {
  selectedMenuType: TimeType;
  menuClickHandler: (timeType: TimeType) => void;
};

function CoinGraphMenu({ selectedMenuType, menuClickHandler }: Props) {
  return (
    <ul className="flex mb-[15px] mt-4 text-sm text-gray-300">
      {graphMenuList.map(({ title, timeType }, i) => (
        <li
          className="w-20 h-4 border-l border-gray-300 flex-center last:border-r"
          key={i}
          onClick={() => menuClickHandler(timeType)}
        >
          <button
            className={`${
              selectedMenuType === timeType && "font-bold text-green"
            }`}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
}
export default CoinGraphMenu;