import React from "react";
import "./BarcodeScanner.css";

export const BarcodeScanner = ({ onSuccess }) => {
  return (
    <div className="page">
      <div className="header">Scan Barcode</div>
      <button onClick={() => onSuccess()}>SUCCESSFUL</button>
    </div>
  );
};
