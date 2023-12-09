import Image from "next/image";
import logo from "../../../public/logo.svg";
import moniwallet from "../../../public/moniwallet.svg";
import metaconnection from "../../../public/metaconnection.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

export default function WalletSuccess({ increment }) {
  return (
    <div className="bg-custom grid grid-rows-3 h-screen">
      <div className="flex items-start justify-center row-start-1">
        <Image className="mt-12" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-center row-start-2">
        {/* Your content for the second element */}
        <Image className="pb-20" src={moniwallet} alt="logo" />
      </div>
      <div className="flex items-center row-start-3 text-white-100">
        <Card className="w-full mx-4">
          <CardHeader className="p-3">
            <Image src={metaconnection} alt="logo" />
          </CardHeader>
          <CardContent>
            <CardTitle>
              You have successfully connected your wallet 🥳
            </CardTitle>
            <CardDescription>
              To add a layer of security, we will verify your aadhar through our
              anon request.
            </CardDescription>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={() => increment()}
              className="w-full "
            >
              {" "}
              <FileSearch className="mr-2 h-4 w-4" /> Continue to Aadhar
              Verification
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
