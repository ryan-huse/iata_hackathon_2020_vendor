import React from "react";
import wc_parts from "../images/wc_parts.png";
import wetcell_battery from "../images/wetcell_battery.png";
import "./WheelchairInfo.scss";

export const WheelchairInfo = function({
  batteryType,
  onCallGuest,
  setImageFile,
  showNextPage,
  barcodeID
}) {
  function handleFiles(e) {
    setImageFile(e.target.files[0]);
    showNextPage();
  }

  return (
    <div className="page">
      <div className="header caution">!Caution</div>
      <div className="content">
        <div className="">
          <img
            className="photo image-wheelchair"
            src={wc_parts}
            alt="image of wheelchair"
          />
        </div>
        <div className="grid">
          <div className="gridTitle">Removeable Parts</div>
          <div className="information">
            <div className="infoItem">
              <div className="column description">Equipment Barcode</div>
              <div className="column data">{barcodeID}</div>
              <div className="column instructionContainer">
                <button className="button secondary instruction">
                  Instructions
                </button>
              </div>
            </div>

            <div className="infoItem">
              <div className="column description">Battery Type</div>
              <div className="column data data-icon">
                <div className="dataText">{batteryType}</div>
                <img className="batteryIcon" src={wetcell_battery} alt="" />
              </div>
              <div className="column instructionContainer">
                <button className="button secondary instruction">
                  Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="messageContainer">
          <div className="title">Note</div>
          <div className="message">
            The joystick is very fragile. Please take extra caution when storing
            and transporting.
          </div>
        </div>
      </div>
      <div className="button-wheelchair">
        <button onClick={onCallGuest} className="button secondary">
          Back
        </button>

        <label class="button primary custom-file-upload">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFiles}
          ></input>
          <p class="done-wheelchair">Camera</p>
        </label>
      </div>
    </div>
  );
};
