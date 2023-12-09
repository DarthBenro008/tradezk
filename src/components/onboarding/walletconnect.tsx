import Image from "next/image";
import logo from "../../../public/logo.svg";
import zeroknow from "../../../public/zeroknow.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWeb3Modal } from "@web3modal/ethers/react";

export default function WalletConnect() {
  const { open } = useWeb3Modal();
  return (
    <div className="bg-custom grid grid-rows-3 h-screen">
      <div className="flex items-start justify-center row-start-1">
        <Image className="mt-12" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-center row-start-2">
        {/* Your content for the second element */}
        <Image className="pb-20" src={zeroknow} alt="logo" />
      </div>
      <div className="flex items-center row-start-3 text-white-100">
        <Card className="w-full mx-4">
          <CardHeader>
            <CardTitle>Peer-to-peer with USDC, INR pair exchange 🤑</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#71717A] ">
              INR - USDC on-chain fast using UPI and the magic of zero knowledge
              proofs
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => open()} className="w-full bg-brand">
              {" "}
              <Wallet className="mr-2 h-4 w-4" /> Login/Register with Wallet
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
