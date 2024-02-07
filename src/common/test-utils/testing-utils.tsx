import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
