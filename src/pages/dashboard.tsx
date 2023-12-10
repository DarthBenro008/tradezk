import Image from "next/image";
import logo from "../../public/logoorange.svg";
import empty from "../../public/empty.svg";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import TradezkContract from "@/utils/contract";
import UsdcContract from "@/utils/usdc_contract";
import { Button } from "@/components/ui/button";
import OktoWallet from "@/utils/okto";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Send, Wallet } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Dashboard() {
  const router = useRouter();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [balance, setBalance] = useState(0);

  const okto = new OktoWallet(
    "",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2luZGN4X2lkIjoiYjAzZDMzNDItMzFkZS00MWNlLThhZWQtMjhjODJkODRhZGYwIiwidXNlcl9pZCI6ImIwM2QzMzQyLTMxZGUtNDFjZS04YWVkLTI4YzgyZDg0YWRmMCIsInNoYXJlZF9pZCI6bnVsbCwicG9ydGZvbGlvRmFjdG9yIjoiMSIsInNlc3Npb25JZCI6IjkzMjE4MDQ4LWE5MTMtNDI0NS04ZjJiLTgyOTM0NDdjY2I0NyIsInVzZXJfbG9naW5fdmVuZG9yX2lkIjoiNTU0OGEzZDUtOTZhZC00NTRlLTgwYjYtNjJjMjg1NDNkMzJkIiwicyI6Im9rdG9fYW5kcm9pZCIsInNpcCI6Ijo6ZmZmZjoxMjcuMC4wLjYiLCJvdiI6Im9rdG9fcGx1cyIsImxvZ2luX21lZGl1bSI6IkdfQVVUSCIsImlhdCI6MTcwMjE1ODE5NSwiZXhwIjoxNzAzMDIyMTk1fQ.GL_iN3Y_5JkDVWbVivfLW1RCZJBqQNKmuDCEPm6LdoM",
    "b67539fd-60d1-4469-8db2-8ade89d63d37"
  );

  const smartCall = async () => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const usdcContract = new UsdcContract(ethersProvider);
    const balance = await usdcContract.balance(localStorage.getItem("address"));
    localStorage.setItem("balance", String(balance));
    setBalance(balance);
    console.log(balance);
  };

  const oktoCall = async () => {
    const data = await okto.get_wallet();
    localStorage.setItem("address", data.address);
  };

  const testCall = async () => {
    const usdcContract = new UsdcContract();
    const code = await usdcContract.getCodeForApproval();
    const data = await okto.execute_raw_transaction(false, code);
    console.log(data);
  };

  useEffect(() => {
    oktoCall();
    smartCall();
  });

  return (
    <div className="px-6">
      {/* <Button
        onClick={async () => {
          await oktoCall();
        }}
      >
        Click Me
      </Button> */}
      <div>
        <div className="mt-10 items-end ">
          <div className="flex justify-between">
            <Image src={logo} className="color-brand" alt="logo" />
            <Badge className="text-white" variant="outline">
              Reputation: 100
            </Badge>
          </div>
        </div>
      </div>
      <div>
        <Card className="border-0 w-full mt-10 bg-banner bg-no-repeat text-white">
          <CardContent>
            <p className="pt-4">Wallet Balance</p>
            <p className="pt-2 text-2xl font-semibold">
              {Math.trunc(balance) ?? 320} USDC
            </p>
            <p className="pt-2 text-neutral-50">
              ~ {Math.trunc(balance * 86)} rs
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => open()}
              className="w-full bg-[#F9F9F9] text-[#17171B]"
            >
              {" "}
              <Wallet className="mr-2 h-4 w-4" /> Add Funds
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <div className="mt-5 items-end">
          <div className="flex justify-between">
            <Button
              onClick={() => router.push("/buyer")}
              className="px-10 border-zinc-800 text-white font-medium"
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Buy USDC
            </Button>
            <Button
              onClick={() => router.push("/seller")}
              variant="outline"
              className=" px-10 border-zinc-800 text-white font-medium"
            >
              {" "}
              <Send className="mr-2 h-4 w-4" /> Sell USDC
            </Button>
          </div>
        </div>
      </div>
      <div>
        <p className="mt-5 text-sm text-neutral-50 font-semibold">
          {" "}
          Order Activity
        </p>
      </div>
      <div>
        <Image className="ml-2 mt-5" src={empty} />
      </div>
    </div>
  );
}
