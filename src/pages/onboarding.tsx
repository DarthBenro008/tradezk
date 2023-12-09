import AadharSuccess from "@/components/onboarding/aadharsuccess";
import VerifyAadhar from "@/components/onboarding/verifyaadhar";
import WalletConnect from "@/components/onboarding/walletconnect";
import WalletSuccess from "@/components/onboarding/walletsuccess";
import { useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { useRouter } from "next/navigation";
import {
  useAnonAadhaar,
} from "anon-aadhaar-react";

export default function Onboarding() {
  const router = useRouter();

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [anonAadhaar] = useAnonAadhaar();

  const [pager, setPager] = useState(0);

  const increment = () => {
    setPager(pager + 1);
  };

  const fragmets = [
    <WalletConnect key={0} />,
    <WalletSuccess key={1} increment={increment} />,
    <VerifyAadhar key={2} />,
    <AadharSuccess key={3} />,
  ];

  useEffect(() => {
    if (isConnected) {
      increment();
    }
  }, [isConnected]);

  useEffect(() => {
    console.log("Anon Aadhaar: ", anonAadhaar.status);
    if (anonAadhaar?.status === "logged-in") {
      localStorage.setItem("aadhar", JSON.stringify(anonAadhaar.pcd, null, 2));
      increment();
    }
  }, [anonAadhaar]);

  return <div>{fragmets[pager]}</div>;
}
