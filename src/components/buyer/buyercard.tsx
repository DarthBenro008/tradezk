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
import UsdcLogo from "../../../public/usdc.svg";

export default function BuyerCard({unit, qty, amount}) {
  return (
    <Card className="mx-4 mt-5">
      <CardHeader className="p-3">
        <div className="flex flex-row space-x-2">
          <div className="flex-shrink-0">
            <Image src={UsdcLogo} alt="usdc" />
          </div>
          <div className="flex-shrink-0 text-xl font-semibold ">Rs {unit ?? 90}</div>
          <div className="flex-shrink-0 text-zinc-400 font-normal mt-0.5 ">
            /Unit
          </div>
          {/* Add more items as needed */}
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Card className="bg-zinc-800 border-0">
          <CardContent className="p-2 px-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                {/* First item */}
                <div className="mb-2 mt-2">
                  <div className="flex flex-row space-x-1 items-center">
                    <div className="flex-shrink-0">
                      <ArchiveRestore className="h-5 text-zinc-400" />
                    </div>
                    <div className="flex-shrink-0 text-zinc-400 text-sm ">
                      Total Quantity
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-neutral-50 text-md font-semibold pl-1 mb-1">
                    {qty ?? 200}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                {/* First item */}
                <div className="mb-2 mt-2">
                  <div className="flex flex-row space-x-1 items-center">
                    <div className="flex-shrink-0">
                      <Currency className="h-5 text-zinc-400" />
                    </div>
                    <div className="flex-shrink-0 text-zinc-400 text-sm ">
                      Total Amount
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-neutral-50 text-md font-semibold pl-1 mb-1">
                    {amount ?? 200}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
