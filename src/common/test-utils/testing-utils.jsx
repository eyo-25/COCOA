import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const customRender = (ui, options) => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
