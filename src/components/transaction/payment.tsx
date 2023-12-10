import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  ArchiveRestore,
  ArrowLeft,
  ArrowLeftCircle,
  Copy,
  Currency,
} from "lucide-react";
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

export default function Payment({ payment, data, qr }) {
  return (
    <div className=" text-white">
      <div>
        <div>
          <div className="mt-10 items-end px-4">
            <div className="flex justify-between">
              <div className="flex flex-row space-x-1">
                <ArrowLeft className="h-4 mt-0.5" />
                <p className="text-neutral-50 text-sm font-semibold">
                  Pay INR to recieve USDC
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
            <p className="text-neutral-50  font-semibold">
              Seller Payment Information
            </p>
          </div>

          <div className="px-8">
            <div>
              <div className="flex flex-row justify-between">
                <div className="flex mb-2 mt-2">
                  <div className="flex flex-row space-x-1 items-center">
                    <div className="flex-shrink-0">
                      <ArchiveRestore className="h-5 text-zinc-400" />
                    </div>
                    <div className="flex-shrink-0 text-zinc-400 text-sm ">
                      UPI ID
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1 mt-1">
                  <p className="text-neutral-50 font-semibold">
                    {data.upi ?? "hello@paytm"}
                  </p>
                  <Copy className="text-zinc-400 h-4 mt-1" />
                </div>
              </div>
            </div>
            <Button onClick={() => qr()} className="w-full mt-2">
              {" "}
              Pay Through UPI
            </Button>
          </div>
        </div>

        {/* Card */}
        <div className="p-4">
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
                    <p className="text-neutral-50 text-lg font-semibold pl-1 mb-1">
                      {data.amount} USDC
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  {/* First item */}
                  <div className="mb-2 mt-2">
                    <div className="flex flex-row space-x-1 items-center">
                      <div className="flex-shrink-0">
                        <ArrowLeftCircle className="h-5 text-zinc-400" />
                      </div>
                      <div className="flex-shrink-0 text-zinc-400 text-sm ">
                        Type
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-neutral-50 text-lg font-semibold pl-1 mb-1">
                      Fixed Price
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="mt-3" />
              <div className=" mt-3">
                <div className="">
                  <p className="text-zinc-400">Pending to pay</p>
                </div>
                <div className="mt-2">
                  <p className="text-neutral-50 text-3xl font-semibold ">
                    Rs {data.rs ?? 16342}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload */}
          <div className="pt-4">
            <p>Upload UPI Transaction Screenshot</p>
            {/* <Button
              onClick={() => payment()}
              variant="outline"
              className="mt-2 w-full"
            >
              Choose File
            </Button> */}
            <Input onChange={payment} id="picture" type="file" />
            <p className="text-zinc-400 text-sm mt-2">
              Take screenshot of your payment from the specified UPI app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
