import Logo from "@/common/assets/logo.svg?react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Logo />
      <Outlet />
    </>
  );
}

export default Layout;
