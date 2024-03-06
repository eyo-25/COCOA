import { MenuType } from "@/common/types/data.type";

type Props = {
  selectedMenuId: number;
  menuClickHandler: (id: number) => void;
  menuList: MenuType[];
};

function CoinChartMenu({ menuList, selectedMenuId, menuClickHandler }: Props) {
  return (
    <div className="flex justify-between mt-6 mb-5">
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
    </div>
  );
}

export default CoinChartMenu;
