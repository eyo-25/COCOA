import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";

function Layout() {
  return (
    <main className="flex flex-col max-w-5xl px-8 mx-auto mb-3 tablet:px-6 mini:px-4 mobile:px-3 mobile:text-sm">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
