import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import tick from "../../../public/tick.svg";
import { useRouter } from "next/navigation";

export default function SellerSuccess() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full mx-4 my-4 mt-10">
        <CardHeader className="p-3 justify-center items-center">
          <Image className="p-4 py-10" src={tick} alt="tick" />
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle>Order Placed Successfully! 🤩</CardTitle>
          <CardDescription className="mt-2">
            Your Order has been placed succesfully!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-center">
          <Button
            onClick={() => router.replace("/dashboard")}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
