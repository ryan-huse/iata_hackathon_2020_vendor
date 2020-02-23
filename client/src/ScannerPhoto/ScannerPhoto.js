import React, { useState } from "react";
import "./ScannerPhoto.css";
import { WebcamCapture } from "./WebcamCapture";

export const ScannerPhoto = function({ onConfirm }) {
  function onCapture(image) {
    console.log(image);
    onConfirm(image);
  }
  return (
    <div className="page">
      <div className="header">Scan Barcode</div>
      <WebcamCapture onCapture={image => onCapture(image)} />
    </div>
  );
};
