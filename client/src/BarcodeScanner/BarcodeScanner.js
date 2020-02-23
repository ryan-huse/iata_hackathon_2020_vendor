import React from "react";
import "./BarcodeScanner.css";
import Dynamsoft from "./Dynamsoft";
import { render } from "react-dom";

export class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.runScanner = this.runScanner.bind(this);
  }

  runScanner = async () => {
    console.log("runscanner");
    let scanner = null;
    scanner = await Dynamsoft.BarcodeScanner.createInstance();

    scanner.onFrameRead = results => {
      console.log(results);
      this.props.onSuccess(results[0]?.barcodeText ?? "9006000001");
      scanner.hide();
    };

    scanner.onUnduplicatedRead = txt => {
      this.props.onSuccess(txt);
    };
    await scanner.show();
  };

  componentDidMount() {
    this.runScanner();
  }

  render() {
    return <div></div>;
  }
}
