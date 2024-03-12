import { createContext, useEffect, useState, ReactNode } from "react";
import { ResponsiveType } from "../types/data.type";
import { getScreenSize } from "../utils/getScreenSize";
import { debounce } from "../utils/debounce";

interface ResponsiveContextProps {
  screenSize: ResponsiveType;
}

export const ResponsiveContext = createContext<
  ResponsiveContextProps | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export function ResponsiveProvider({ children }: Props) {
  const [screenSize, setScreenSize] = useState(
    getScreenSize(window.innerWidth)
  );

  const handleResize = debounce(() => {
    setScreenSize(getScreenSize(window.innerWidth));
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ screenSize }}>
      {children}
    </ResponsiveContext.Provider>
  );
}
