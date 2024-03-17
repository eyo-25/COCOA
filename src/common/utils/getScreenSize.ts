import { ResponsiveType } from "../types/data.type";

export const getScreenSize = (width: number): ResponsiveType => {
  if (width < 500) {
    return "xs";
  } else if (width < 600) {
    return "sm";
  } else if (width < 720) {
    return "base";
  } else if (width < 820) {
    return "lg";
  } else if (width < 960) {
    return "xl";
  } else {
    return "max";
  }
};
