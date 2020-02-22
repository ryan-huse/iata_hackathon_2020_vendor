import React from "react";
import "./BarcodeScanner.css";

export const BarcodeScanner = ({ onSuccess }) => {
  return (
    <div>
      <h1>Scan Barcode</h1>
      <span>
        If the barode is properly registered, the photo page will automatically
        pull up.
      </span>
      <button onClick={() => onSuccess()}>SUCCESSFUL</button>
    </div>
  );
};
