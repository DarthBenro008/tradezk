import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

export default function Note(){
    return (
        <Card className="w-full">
        <CardHeader className="p-3 dark:"></CardHeader>
        <CardContent>
          <p className="text-lg">
            {" "}
            <StickyNote /> Note
          </p>
          <CardDescription>
            Once published you won’t be able to delete the listing and will
            have to create an ad again if you wish to cancel this.
          </CardDescription>
        </CardContent>
      </Card>
    )
}