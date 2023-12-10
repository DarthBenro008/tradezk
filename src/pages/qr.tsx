import { useQRCode } from "next-qrcode";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";

export default function Qr({ back }) {
  const { Image } = useQRCode();

  const data = JSON.parse(localStorage.getItem("element"));

  function generateHash(input) {
    // Generate SHA-256 hash
    const hash = CryptoJS.SHA256(input);
    // Convert the hash to a hexadecimal string
    const hashHex = hash.toString(CryptoJS.enc.Hex);
    localStorage.setItem("hash", hashHex);
    return hashHex;
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen flex-col">
        <Image
          className="flex"
          text={`upi://pay?pa=${data.upi}&pn=Seller&am=${
            data.rs
          }&cu=INR&tn=${generateHash(data.upi + data.amount + data.qty)}`}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#010599FF",
              light: "#FFBF60FF",
            },
          }}
        />
        <div className="flex mt-4">
          <Button onClick={() => back()} className="flex w-full">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
