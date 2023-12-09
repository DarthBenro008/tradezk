import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Web3ModalProvider } from "@/context/walletconnect";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const app_id = "1111528717802619247954060243396702739433835724800";

export const metadata = {
  title: "Web3Modal",
  description: "TradeZK web3modal",
};

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <Web3ModalProvider>
          <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
            <Component {...pageProps} />
          </AnonAadhaarProvider>
        </Web3ModalProvider>
      ) : null}
    </>
  );
}
