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

export default function Seller() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const publish = () => {
    setSuccess(true);
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
            className="border-zinc-800"
            type="number"
            id="qty"
            placeholder="10"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-10">
          <Label htmlFor="number">Set Unit Price</Label>
          <Input
            className="border-zinc-800"
            type="number"
            id="unitproce"
            placeholder="85"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-10">
          <Label htmlFor="text">Enter VPA or UPI to receive funds on</Label>
          <Input
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
          <Button
            onClick={() => publish()}
            className=" px-10"
          >
            {" "}
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
