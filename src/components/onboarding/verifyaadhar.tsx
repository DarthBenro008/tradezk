import Image from "next/image";
import logo from "../../../public/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import aadhar from "../../../public/aadhar.svg";
import { LogInWithAnonAadhaar } from "anon-aadhaar-react";

export default function VerifyAadhar() {
  return (
    <div>
      <div className=" flex items-start justify-center row-start-1">
        <Image className="mt-12" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-center row-start-2">
        <Image className="pt-14" src={aadhar} alt="logo" />
      </div>
      <div className="flex items-center row-start-3 text-white-100">
        <Card className="w-full mx-4 my-4 mt-10">
          <CardHeader className="p-3">
            <CardTitle>Verify Aadhar</CardTitle>
            <CardDescription>
              Be prepared with your Aadhar e-pdf for the next step. It takes
              usually a min to process. 😉
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Button variant="link">
              <div>
                <Globe className="h-4 w-4 mr-2 color-[#7F62F5]" />
              </div>
              Generate Aadhar e-pdf and password
            </Button> */}
            {/* <p>Generate Aadhar e-pdf and password</p> */}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-center">
            {/* <Button className="w-full bg-[#F9F9F9] text-[#17171B]">
              {" "}
              <Globe className="mr-2 h-4 w-4" /> Continue to Aadhar Verification
            </Button> */}
            <div className="mb-2">
              <LogInWithAnonAadhaar />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
