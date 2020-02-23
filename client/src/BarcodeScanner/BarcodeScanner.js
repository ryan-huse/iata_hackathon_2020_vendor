import React from "react";
import "./BarcodeScanner.css";

export const BarcodeScanner = ({ onSuccess }) => {
  return (
    <div>
      <div className="header">Scan Barcode</div>
      <span>
        If the barode is properly registered, the photo page will automatically
        pull up.
      </span>
      <button onClick={() => onSuccess()}>SUCCESSFUL</button>
    </div>
  );
};
