import React from "react";
import "./BarcodeScanner.css";
import Dynamsoft from "./Dynamsoft";

export const BarcodeScanner = ({ onSuccess }) => {
  async function runStuff() {
    let scanner = null;

    (async () => {
      scanner = await Dynamsoft.BarcodeScanner.createInstance();
      scanner.onFrameRead = results => {
        console.log(results);
        scanner.hide();
        onSuccess(results[0]?.barcodeText ?? "426000151");
      };
      scanner.onUnduplicatedRead = txt => {
        onSuccess(txt);
      };
      await scanner.show();
    })();
  }

  return (
    <div>
      <button onClick={() => runStuff()}>Scan Barcode</button>
    </div>
  );
};
