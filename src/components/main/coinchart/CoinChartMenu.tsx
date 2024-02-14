import { menuList } from "./CoinChart.data";

type Props = {
  selectedMenuId: number;
  menuClickHandler: (id: number) => void;
};

function CoinChartMenu({ selectedMenuId, menuClickHandler }: Props) {
  return (
    <div className="flex justify-between mb-5">
      <ul className="flex gap-3">
        {menuList.map(({ title }, i) => (
          <li key={title}>
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
      <input />
    </div>
  );
}

export default CoinChartMenu;
