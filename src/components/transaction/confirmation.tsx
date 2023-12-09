import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import UsdcLogo from "../../../public/usdc.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArchiveRestore, ArrowLeft, Currency } from "lucide-react";
import Note from "../common/note";

export default function TransactionConfirmation({ interest, data}) {
 
  return (
    <div>
      <div>
        <div>
          <div className="mt-10 items-end px-4">
            <div className="flex justify-between">
              <div className="flex flex-row space-x-1">
                <ArrowLeft className="h-4 mt-0.5" />
                <p className="text-neutral-50 text-sm font-semibold">
                  Confirm Transaction
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
          <div className="p-4">
            <div className="flex flex-row space-x-2">
              <div className="flex-shrink-0">
                <Image src={UsdcLogo} alt="usdc" />
              </div>
              <div className="flex-shrink-0 text-xl font-semibold ">
                Rs {data.rate}
              </div>
              <div className="flex-shrink-0 text-zinc-400 font-normal mt-0.5 ">
                /Unit
              </div>
              {/* Add more items as needed */}
            </div>
          </div>

          {/* Card Element */}
          <div className="px-4">
            <Card>
              <CardContent className="mt-4">
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
                        {data.amount} USDC
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
                        Rs {data.rs}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="mt-2" />
                <div className="flex flex-row justify-between mt-2">
                  <div className="flex">
                    <p>Total Amount</p>
                  </div>
                  <div className="flex">
                    <p className="text-neutral-50 text-xl font-semibold ">
                      Rs {data.rs}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Button Element */}
          <div className="p-4">
            <Note />
          </div>
          {/* Button Element */}
          <div className="px-4">
            <Button
              className="w-full"
              onClick={() => {
                interest();
              }}
            >
              {" "}
              Proceed{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
