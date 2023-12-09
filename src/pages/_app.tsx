import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Web3ModalProvider } from "@/context/walletconnect";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { SnackbarProvider, useSnackbar } from "notistack";
// import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers, BrowserProvider, Contract, formatUnits } from "ethers";

const app_id = "1111528717802619247954060243396702739433835724800";

export const metadata = {
  title: "Web3Modal",
  description: "TradeZK web3modal",
};

export default function App({ Component, pageProps }: AppProps) {
  // const { isConnected } = useWeb3ModalAccount();
  // const { walletProvider } = useWeb3ModalProvider();
  const [ready, setReady] = useState<boolean>(false);
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const pushChannelAdress = "0xad18c8ac2F189Ca0a715122a46ef9ACB3dD6Bb5E";

  useEffect(() => {
    setReady(true);
  }, []);

  // useEffect(() => {
  //   if (isConnected) {
  //     const ethersProvider = new BrowserProvider(walletProvider);
  //     ethersProvider.getSigner().then((signer) => {
  //       PushAPI.initialize(signer, {
  //         env: CONSTANTS.ENV.STAGING,
  //       }).then((alice) => {
  //         alice.notification
  //           .subscribe(
  //             `eip155:11155111:${pushChannelAdress}` // channel address in CAIP format
  //           )
  //           .then(() => {
  //             alice.initStream([CONSTANTS.STREAM.NOTIF]).then((stream) => {
  //               stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
  //                 console.log(data);
  //                 enqueueSnackbar(data);
  //               });
  //               stream.connect();
  //             });
  //           });
  //       });
  //     });
  //   }
  // }, [isConnected]);

  return (
    <>
      {ready ? (
        <SnackbarProvider>
          <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
            <Web3ModalProvider>
              <Component {...pageProps} />
            </Web3ModalProvider>
          </AnonAadhaarProvider>
        </SnackbarProvider>
      ) : null}
    </>
  );
}
