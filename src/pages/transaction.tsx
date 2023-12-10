import TransactionConfirmation from "@/components/transaction/confirmation";
import Payment from "@/components/transaction/payment";
import TransactionSuccess from "@/components/transaction/transactionsuccess";
import { useEffect, useState } from "react";
import Qr from "./qr";
import OktoWallet from "@/utils/okto";
import TradezkContract from "@/utils/contract";
import { SnackbarProvider, useSnackbar } from "notistack";
import { createWorker } from "tesseract.js";

export default function Transaction() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pager, setPager] = useState(0);
  const [qrShown, setQrShown] = useState(false);
  const data = JSON.parse(localStorage.getItem("element"));
  const increment = () => {
    setPager(pager + 1);
  };

  const okto = new OktoWallet(
    "",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2luZGN4X2lkIjoiYjAzZDMzNDItMzFkZS00MWNlLThhZWQtMjhjODJkODRhZGYwIiwidXNlcl9pZCI6ImIwM2QzMzQyLTMxZGUtNDFjZS04YWVkLTI4YzgyZDg0YWRmMCIsInNoYXJlZF9pZCI6bnVsbCwicG9ydGZvbGlvRmFjdG9yIjoiMSIsInNlc3Npb25JZCI6IjkzMjE4MDQ4LWE5MTMtNDI0NS04ZjJiLTgyOTM0NDdjY2I0NyIsInVzZXJfbG9naW5fdmVuZG9yX2lkIjoiNTU0OGEzZDUtOTZhZC00NTRlLTgwYjYtNjJjMjg1NDNkMzJkIiwicyI6Im9rdG9fYW5kcm9pZCIsInNpcCI6Ijo6ZmZmZjoxMjcuMC4wLjYiLCJvdiI6Im9rdG9fcGx1cyIsImxvZ2luX21lZGl1bSI6IkdfQVVUSCIsImlhdCI6MTcwMjE1ODE5NSwiZXhwIjoxNzAzMDIyMTk1fQ.GL_iN3Y_5JkDVWbVivfLW1RCZJBqQNKmuDCEPm6LdoM",
    "b67539fd-60d1-4469-8db2-8ade89d63d37"
  );

  const confirmInterest = () => {
    increment();
  };

  const offscreen_canvas = new OffscreenCanvas(0, 0);
  const offscreen_canvas_context = offscreen_canvas.getContext("2d");

  const checker = (text) => {
    if (text.includes(data.upi) && text.includes(data.rs)) {
      enqueueSnackbar("ZK Generated, broadcasting", { variant: "success" });
      const contract = new TradezkContract();
      const datacode = contract.generateCodeForFullfill(data.id, "1");
      enqueueSnackbar("Verifying your proof", { variant: "info" });
      okto
        .execute_raw_transaction(true, datacode)
        .then(async (datacoderesult) => {
          enqueueSnackbar(
            "Please wait for transaction to be broadcasted, might take upto 20 seconds",
            { autoHideDuration: 15000 }
          );
          await new Promise((r) => setTimeout(r, 15000));
          increment();
        })
        .catch((err) => {
          enqueueSnackbar("Something went wrong!");
        });
    } else {
      enqueueSnackbar("Error generating your ZK!", { variant: "error" });
    }
  };

  const scanFile = async (e) => {
    console.log("moshi moshi");

    // const ret = await worker.recognize(
    //   "https://tesseract.projectnaptha.com/img/eng_bw.png"
    // );
    // console.log(ret.data.text);

    var file = e.target.files[0];
    if (file == undefined) return;
    console.log("moshi moshi sooper");
    enqueueSnackbar("Generating ZK Proof");
    var reader = new FileReader();
    reader.onload = function (event) {
      const reader_image = event.target.result;
      const image = new Image();
      image.onload = function () {
        offscreen_canvas.width = image.width;
        offscreen_canvas.height = image.height;
        offscreen_canvas_context.drawImage(image, 0, 0);
        offscreen_canvas.convertToBlob().then(async (blob) => {
          console.log("blob", blob);
          const worker = await createWorker("eng");
          const ret = await worker.recognize(blob);
          console.log("data", ret.data.text);
          checker(ret.data.text);
          await worker.terminate();
        });
      };
      image.src = reader_image;
    };
    reader.readAsDataURL(file);
  };

  const confirmPayment = (e) => {
    scanFile(e);
  };

  const toggleQr = () => {
    setQrShown(!qrShown);
  };

  const fragmets = [
    <TransactionConfirmation key={0} interest={confirmInterest} data={data} />,
    <Payment key={1} payment={confirmPayment} data={data} qr={toggleQr} />,
    <TransactionSuccess key={2} />,
  ];
  return <div>{qrShown ? <Qr back={toggleQr} /> : fragmets[pager]}</div>;
}
