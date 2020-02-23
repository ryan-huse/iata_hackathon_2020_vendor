import React, { useState } from "react";
import "./Confirmation.scss";

import wetcell_battery from "../images/wetcell_battery.png";
import { CheckButton } from "../images/logos";

export const Confirmation = function({
  barcodeID,
  flightInfo,
  batteryType,
  onBack,
  handleSubmit,
  onExit,
  onScanAgain,
  imageFile
}) {
  const [showOverlay, updateShowOverlay] = useState(false);

  const showPopup = () => {
    updateShowOverlay(true);
  };

  const onConfirm = e => {
    showPopup();
    handleSubmit(e.target.value);
  };

  async function handleFileUpload(imageRef) {
    if (imageRef !== null && imageFile !== null) {
      imageRef.src = `data:image/png;base64,${new Buffer(
        await new Response(imageFile).arrayBuffer(),
        "binary"
      ).toString("base64")}`;
      imageRef.style.display = "inline";
    }
  }

  return (
    <div className="page wrapper">
      {showOverlay && (
        <div className="overlay">
          <div className="modal">
            <div className="successContainer">
              <div className="iconContainer">
                <CheckButton className="modalIcon" />
              </div>
              <div className="modalText">Success!</div>
            </div>
            <div className="questionContainer">
              <div className="modalText">Scan another wheelchair?</div>
              <div className="buttons">
                <button onClick={onExit} className="button secondary">
                  No
                </button>
                <button className="button primary">Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="confirmation">
        <div className="header">Confirmation</div>
        <div className="content">
          <div className="information">
            <div className="infoItem">
              <div className="column description">Equipment Barcode</div>
              <div className="column data">{barcodeID}</div>
            </div>
            <div className="infoItem">
              <div className="column description">Flight Information</div>
              <div className="column data">{flightInfo}</div>
            </div>
            <div className="infoItem">
              <div className="column description">Battery Type</div>
              <div className="column data data-icon">
                <div className="dataText">{batteryType}</div>
                <img className="batteryIcon" src={wetcell_battery} alt="" />
              </div>
            </div>
          </div>
          <div className="imageContainer">
            <img
              style={{ display: "none" }}
              ref={ref => handleFileUpload(ref)}
              width="150"
              alt="Thumb preview..."
            ></img>
          </div>
          <div className="buttons">
            <button onClick={onBack} className="button secondary">
              Back
            </button>
            <button onClick={onConfirm} className="button primary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
