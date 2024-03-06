import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";

function Layout() {
  return (
    <main className="flex flex-col max-w-5xl px-8 mx-auto mb-3">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
