import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";
import SwrconfigContext from "../context/SwrconfigContext";

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(
    <SwrconfigContext>
      <BrowserRouter>{ui}</BrowserRouter>
    </SwrconfigContext>,
    options
  );
};

export * from "@testing-library/react";
export { customRender as render };
