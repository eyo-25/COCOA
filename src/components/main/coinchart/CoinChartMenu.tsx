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
              className={`px-3 py-1 rounded-md font-medium ${
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
