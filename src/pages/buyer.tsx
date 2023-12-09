import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { ArchiveRestore, ArrowLeft, Currency } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import UsdcLogo from "../../public/usdc.svg";
import { useRouter } from "next/router";
import BuyerCard from "@/components/buyer/buyercard";
import { useEffect, useState } from "react";
import TradezkContract from "@/utils/contract";

export default function Buyer() {
  const router = useRouter();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = new TradezkContract(ethersProvider);
    const orders = await contract.orders();
    console.log(orders);
    setOrders(orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const transaction = (element) => {
    localStorage.setItem("element", JSON.stringify(element));
    router.push("/transaction");
  };

  return (
    <div className=" text-white">
      <div>
        <div>
          <div className="mt-10 items-end px-4">
            <div className="flex justify-between">
              <div className="flex flex-row space-x-1">
                <ArrowLeft className="h-4 mt-0.5" />
                <p className="text-neutral-50 text-sm font-semibold">
                  Buy USDC
                </p>
              </div>

              <Badge className="text-white" variant="outline">
                Reputation: 100
              </Badge>
            </div>
          </div>
        </div>
        <Separator className="mt-4" />
        <div>
          {orders.map((order) => (
            <div onClick={() => transaction(order)} key={order.id}>
              <BuyerCard
                unit={order.rate}
                qty={order.amount}
                amount={Number(order.rate) * Number(order.amount)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
