import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import SellerSuccess from "@/components/seller/sellersuccess";
import Note from "@/components/common/note";
import OktoWallet from "@/utils/okto";
import TradezkContract from "@/utils/contract";
import UsdcContract from "@/utils/usdc_contract";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function Seller() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [amounto, setAmounto] = useState("");
  const [rate, setRate] = useState("");
  const [upi, setUpi] = useState("");

  const okto = new OktoWallet(
    "",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2luZGN4X2lkIjoiYjAzZDMzNDItMzFkZS00MWNlLThhZWQtMjhjODJkODRhZGYwIiwidXNlcl9pZCI6ImIwM2QzMzQyLTMxZGUtNDFjZS04YWVkLTI4YzgyZDg0YWRmMCIsInNoYXJlZF9pZCI6bnVsbCwicG9ydGZvbGlvRmFjdG9yIjoiMSIsInNlc3Npb25JZCI6IjkzMjE4MDQ4LWE5MTMtNDI0NS04ZjJiLTgyOTM0NDdjY2I0NyIsInVzZXJfbG9naW5fdmVuZG9yX2lkIjoiNTU0OGEzZDUtOTZhZC00NTRlLTgwYjYtNjJjMjg1NDNkMzJkIiwicyI6Im9rdG9fYW5kcm9pZCIsInNpcCI6Ijo6ZmZmZjoxMjcuMC4wLjYiLCJvdiI6Im9rdG9fcGx1cyIsImxvZ2luX21lZGl1bSI6IkdfQVVUSCIsImlhdCI6MTcwMjE1ODE5NSwiZXhwIjoxNzAzMDIyMTk1fQ.GL_iN3Y_5JkDVWbVivfLW1RCZJBqQNKmuDCEPm6LdoM",
    "b67539fd-60d1-4469-8db2-8ade89d63d37"
  );

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmounto(event.target.value);
  };
  const handleRateChange = (event) => {
    event.preventDefault();
    setRate(event.target.value);
  };

  const handleUpiChange = (event) => {
    event.preventDefault();
    setUpi(event.target.value);
  };

  const publish = () => {
    const contract = new TradezkContract();
    console.log(amounto, upi, rate);
    const data = contract.generateCodeForCreateOrder(
      Number(amounto),
      upi,
      rate
    );
    enqueueSnackbar("Publishing your order", { variant: "info" });
    okto
      .execute_raw_transaction(true, data)
      .then(async (data) => {
        enqueueSnackbar(
          "Please wait for transaction to be broadcasted, might take upto 20 seconds",
          { autoHideDuration: 15000 }
        );
        await new Promise((r) => setTimeout(r, 15000));
        setSuccess(true);
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong!");
      });
  };
  return success ? (
    <SellerSuccess />
  ) : (
    <div className="text-white p-6 mt-10">
      <h3 className="font-bold text-xl">Add basic details about your order</h3>
      <p className="font-light text-[#A1A1AA]">
        Fill in to make your order public
      </p>

      <div className="mt-10">
        <div className=" grid w-full max-w-sm items-center gap-2 mt-10">
          <Label htmlFor="email">Enter UDSC Quantity</Label>
          <Input
            onChange={handleAmountChange}
            value={amounto}
            className="border-zinc-800"
            type="number"
            id="qty"
            placeholder="10"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-10">
          <Label htmlFor="number">Set Unit Price</Label>
          <Input
            onChange={handleRateChange}
            value={rate}
            className="border-zinc-800"
            type="number"
            id="unitproce"
            placeholder="85"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-10">
          <Label htmlFor="text">Enter VPA or UPI to receive funds on</Label>
          <Input
            onChange={handleUpiChange}
            value={upi}
            className="border-zinc-800"
            type="text"
            id="vpa"
            placeholder="hello@paytm"
          />
        </div>
      </div>

      <div className="mt-10">
        <Note />
      </div>

      <div className="mt-10 items-end h-screen">
        <div className="flex justify-between">
          <Button
            onClick={() => router.replace("/dashboard")}
            className="px-10 text-[#18181B] bg-[#FAFAFA]"
          >
            Cancel
          </Button>
          <Button onClick={() => publish()} className=" px-10">
            {" "}
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
