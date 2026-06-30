import { ReactNode } from "react";
import { MenuType } from "@/common/types/data.type";

type Props = {
  selectedMenuId: number;
  menuClickHandler: (id: number) => void;
  menuList: MenuType[];
  rightLabel?: string;
  rightContent?: ReactNode;
};

function CoinChartMenu({
  menuList,
  selectedMenuId,
  menuClickHandler,
  rightLabel,
  rightContent,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3 my-5 tablet:my-[18px] mini:my-4 mobile:my-3">
      <ul className="flex flex-wrap gap-3">
        {menuList.map(({ title }, i) => (
          <li key={title + i}>
            <button
              onClick={() => menuClickHandler(i)}
              className={`px-3 pt-1 pb-[6px] rounded-md font-medium hover:bg-gray-500/50 ${
                i === selectedMenuId && "bg-green text-black"
              }`}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
      {rightContent}
      {!rightContent && rightLabel && (
        <p className="text-sm text-gray-300 shrink-0 mobile:text-xs">
          {rightLabel}
        </p>
      )}
    </div>
  );
}

export default CoinChartMenu;
