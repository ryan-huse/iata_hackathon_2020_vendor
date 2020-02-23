import React, { useState } from "react";
import "./ScannerPhoto.css";
import { WebcamCapture } from "./WebcamCapture";

export const ScannerPhoto = function({ onConfirm }) {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

  function onCapture(image) {
    console.log(image);
    images.push(image);
    console.log(images);
    setImages(images);
    setImage(image);
  }

  function sendImages() {
    console.log(images);
    onConfirm(images);
  }

  return (
    <div>
      <h1>Take Photo of FRONT</h1>
      <h2>images: {images.length}</h2>
      {image == null ? (
        <WebcamCapture onCapture={image => onCapture(image)} />
      ) : (
        <>
          <h1>IMAGE:</h1>
          <img src={image} />
          <button onClick={() => sendImages()}>Confirm Photo</button>
        </>
      )}
    </div>
  );
};
