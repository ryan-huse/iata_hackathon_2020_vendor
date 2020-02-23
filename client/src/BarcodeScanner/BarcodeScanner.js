import React from "react";
import "./BarcodeScanner.css";

export const BarcodeScanner = ({ onSuccess }) => {
  const runStuff = async () => {
    await window.scanner.updateVideoSettings({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: { ideal: "environment" }
      }
    });
    await window.scanner.show();
  };

  return (
    <div>
      <input
        type="text"
        value={window.results ? window.results[0].BarcodeText : ""}
      ></input>
      <button onClick={() => runStuff()}>Scan Barcode</button>
    </div>
  );
};
