import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";
import SwrconfigContext from "../context/SwrconfigContext";
import { ResponsiveProvider } from "../context/ResponsiveContext";

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(
    <SwrconfigContext>
      <ResponsiveProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ResponsiveProvider>
    </SwrconfigContext>,
    options
  );
};

export * from "@testing-library/react";
export { customRender as render };
