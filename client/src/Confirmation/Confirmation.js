import React from "react";
import "./Confirmation.scss";

import picture from "./iphone6s_photo.jpg";
import wetcell_battery from "../images/wetcell_battery.png";

export const Confirmation = function({
  barcodeID,
  flightInfo,
  batteryType,
  imageSrc,
  onBack,
  onConfirm
}) {
  imageSrc = picture;
  return (
    <div className="confirmation">
      <div className="header">Confirmation</div>
      <div className="content">
        <div className="information">
          <div className="infoItem">
            <div className="description">Equipment Barcode</div>
            <div className="data">{barcodeID}</div>
          </div>
          <div className="infoItem">
            <div className="description">Flight Information</div>
            <div className="data">{flightInfo}</div>
          </div>
          <div className="infoItem">
            <div className="description">Battery Type</div>
            <div className="data data-icon">
              <div className="dataText">{batteryType}</div>
              <img className="batteryIcon" src={wetcell_battery} alt="" />
            </div>
          </div>
          <div className="imageContainer">
            <img className="photo" src={imageSrc} alt="image of wheelchair" />
          </div>
          <div className="buttons">
            <button onClick={onBack} className="button primary">
              Back
            </button>
            <button onClick={onConfirm} className="button secondary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
