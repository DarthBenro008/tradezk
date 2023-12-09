import TransactionConfirmation from "@/components/transaction/confirmation";
import Payment from "@/components/transaction/payment";
import TransactionSuccess from "@/components/transaction/transactionsuccess";
import { useEffect, useState } from "react";
import Qr from "./qr";

export default function Transaction() {
  const [pager, setPager] = useState(0);
  const [qrShown, setQrShown] = useState(false);
  const increment = () => {
    setPager(pager + 1);
  };

  const confirmInterest = () => {
    increment();
  };

  const confirmPayment = () => {
    increment();
  };

  const toggleQr = () => {
    setQrShown(!qrShown);
  };

  const data = JSON.parse(localStorage.getItem("element"));

  const fragmets = [
    <TransactionConfirmation key={0} interest={confirmInterest} data={data} />,
    <Payment key={1} payment={confirmPayment} data={data} qr={toggleQr} />,
    <TransactionSuccess key={2} />,
  ];
  return <div>{qrShown ? <Qr back={toggleQr} /> : fragmets[pager]}</div>;
}
