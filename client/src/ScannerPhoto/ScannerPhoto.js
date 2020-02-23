import React, { useState } from "react";
import "./ScannerPhoto.css";
import { WebcamCapture } from "./WebcamCapture";

export const ScannerPhoto = function({
  onConfirm,
  updateFileUpload,
  handleSubmit
}) {
  const [imageTag, setImageTag] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  function onCapture(image) {
    console.log(image);
    onConfirm(image);
  }

  function handleRef(ref) {
    console.log(ref);
    setFileUpload(ref);
    updateFileUpload(ref);
  }

  async function handleFileUpload() {
    if (fileUpload) {
      var file = fileUpload.files[0];
      imageTag.src = `data:image/png;base64,${new Buffer(
        await new Response(file).arrayBuffer(),
        "binary"
      ).toString("base64")}`;
      imageTag.style.display = "inline";
    }
  }

  return (
    <div className="page">
      <div className="header">Scan Barcode</div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={ref => handleRef(ref)}
        onChange={() => handleFileUpload()}
      ></input>
      <img
        style={{ display: "none" }}
        ref={ref => setImageTag(ref)}
        width="150"
        alt="Thumb preview..."
      ></img>
      <button onClick={e => handleSubmit(e.target.value)}>Submit</button>
    </div>
  );
};
