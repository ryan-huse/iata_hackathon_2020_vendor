import React, { useState } from "react";
import "./Confirmation.scss";

import wetcell_battery from "../images/wetcell_battery.png";
import { CheckButton } from "../images/logos";

export const Confirmation = function({
  barcodeID,
  flightInfo,
  batteryType,
  imageSrc,
  onBack,
  sendData,
  onExit,
  onScanAgain
}) {
  const [showOverlay, updateShowOverlay] = useState(false);
  const showPopup = () => {
    updateShowOverlay(true);
  };

  const onConfirm = () => {
    showPopup();
    sendData();
  };

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
                <button onClick={onScanAgain} className="button primary">
                  Yes
                </button>
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
            <img className="photo" src={imageSrc} alt="image of wheelchair" />
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
