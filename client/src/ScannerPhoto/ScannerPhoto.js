import React, { useState } from "react";
import "./ScannerPhoto.css";
import { WebcamCapture } from "./WebcamCapture";

export const ScannerPhoto = function({ onConfirm }) {
  const [image, setImage] = useState(null);

  function onCapture(image) {
    console.log(image);
    setImage(image);
  }
  return (
    <div>
      <h1>Take Photo of FRONT</h1>
      {image == null ? (
        <WebcamCapture onCapture={image => onCapture(image)} />
      ) : (
        <>
          <h1>IMAGE:</h1>
          <img src={image} />
          <button onClick={() => onConfirm(image)}>Confirm Photo</button>
        </>
      )}
    </div>
  );
};
