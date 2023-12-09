import Image from "next/image";
import logo from "../../public/logoorange.svg";
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

export default function Dashboard() {
  const router = useRouter();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const smartCall = async () => {
    console.log("hi");
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const contract = new TradezkContract(signer);
    const usdcContract = new UsdcContract(signer);
    await contract.reputation();
    const balance = await usdcContract.balance();
    const orders = await contract.orders();
    console.log(balance);
    console.log(orders);
  };

  const oktoCall = async () => {
    const okto = new OktoWallet(
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU0YWRmYjQzNmI5ZTE5N2UyZTExMDZhZjJjODQyMjg0ZTQ5ODZhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTYxNDM3ODAyODA4MTIzOTI0MTQiLCJlbWFpbCI6ImhrcGRldjAwOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZxWkVEUnhPV0NkZ1FEYlBKcDZxb1EiLCJpYXQiOjE3MDIxMTI3OTUsImV4cCI6MTcwMjExNjM5NX0.bVcGh_icaMNjgjq5TDzrP0fBUNvZ8NcpZnjXlUfL2Qqrzksg4TItunKR8NAZGduJnFh-2aoYJtz29rRCr-bHajeypxrw_0o82Pdb_fdKJ5dM-LrCgXOgSAesPHaiDyBqFZpdGBcCBfg8Nc1TU-GuHaAehbxV3e3C33XtTJx1XhDasg9qqtWX--eqKhB3poKeiWwTCnLYoqk4h5zMShsPa7TFxJlVAkh5LRwoO70d_Bt_ZxvXbZOYHDDEN-92qBtrS01OxEKxmCRufjz7da1ct6suSEWXH8tNSvGDVt83hYyRDmJtV2O0KTURaXKOI336tcFHZGyE1Al54QyrmbDBdA",
      "",
      "b67539fd-60d1-4469-8db2-8ade89d63d37"
    );
    const data = await okto.lol();
    //     const { auth_token, refresh_auth_token, device_token } =
    //       await okto.authenticate("ggwp");
    //     console.log(auth_token, refresh_auth_token, device_token);
    //     const data = await okto.fetch_network()
    //     console.log(data);
  };

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
            <p className="pt-2 text-2xl font-semibold">32 USDC</p>
            <p className="pt-2 text-neutral-50">~ 2400rs</p>
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
            onClick={() => oktoCall()}
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
    </div>
  );
}
