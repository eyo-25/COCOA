import { Logo } from "@/common/assets";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="flex items-center justify-between w-full h-14">
      <Link to="/">
        <Logo data-testid="logo" />
      </Link>
      <nav className="flex items-center gap-8 font-medium">
        <Link
          to="/"
          className={`${
            (currentPath === "/" || currentPath.includes("assets/")) &&
            "text-green"
          }`}
        >
          시장동향
        </Link>
        <Link
          to="/news"
          className={`${currentPath === "/news" && "text-green"}`}
        >
          뉴스
        </Link>
        <button className="px-3 py-1 font-bold text-gray-800 rounded bg-green">
          로그인
        </button>
      </nav>
    </header>
  );
}

export default Header;
