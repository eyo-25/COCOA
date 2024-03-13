import { useContext } from "react";
import { ResponsiveContext } from "../context/ResponsiveContext";

export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
}
