import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const app_id =  "1111528717802619247954060243396702739433835724800";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <AnonAadhaarProvider _appId={app_id}>
          <Component {...pageProps} />
        </AnonAadhaarProvider>
      ) : null}
    </>
  );
}
