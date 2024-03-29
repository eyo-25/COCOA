import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function SwrconfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        // refreshInterval: 60000,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
