import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import BuyerCard from "@/components/buyer/buyercard";

export default function Buyer() {
  return (
    <div className=" text-white">
      <div>
        <div>
          <div className="mt-10 items-end px-4">
            <div className="flex justify-between">
            <div className="flex flex-row space-x-1">
                <ArrowLeft className="h-4 mt-0.5"/>
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
         <BuyerCard />
         <BuyerCard />
         <BuyerCard />
         <BuyerCard />
         
        </div>
      </div>
    </div>
  );
}
