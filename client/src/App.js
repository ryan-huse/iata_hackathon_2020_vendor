import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

import { BarcodeScanner } from "./BarcodeScanner/BarcodeScanner";
import { Confirmation } from "./Confirmation/Confirmation";
import { ScannerPhoto } from "./ScannerPhoto/ScannerPhoto";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    page: "HOME",
    userId: "",
    imageSrc: "",
    barcodeID: "90060000001",
    flightInfo: "CI 0757-SEA",
    batteryType: "Wet Cell - WCBW"
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async () => {
    const airport = await fetch(
      "https://geolocation-qa-west.azurewebsites.net/api/lookup/resolve",
      {
        method: "GET"
      }
    )
      .then(async r => await r.json())
      .catch(err => console.log(err));
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post: this.state.post,
        barcodeID: this.state.barcodeID,
        airline: "Delta",
        photographer: "109228",
        date: new Date(),
        airport: airport.ResolvedCity
          ? airport.ResolvedCity.NearestAlaskaDestination
            ? airport.ResolvedCity.NearestAlaskaDestination.Code
            : ""
          : ""
      })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  onConfirm = imageSrc => {
    console.log(imageSrc);
    console.log("setting state");
    this.setState({ post: imageSrc });
    this.setState({ imageSrc: imageSrc });
    this.setState({ page: "CONFIRMATION" });
  };

  render() {
    return (
      <div className="App">
        {this.state.page === "BARCODESCANNER" ? (
          <BarcodeScanner
            onSuccess={() => this.setState({ page: "SCANNERPHOTO" })}
          />
        ) : this.state.page === "CONFIRMATION" ? (
          <Confirmation
            barcodeID={this.state.barcodeID}
            flightInfo={this.state.flightInfo}
            batteryType={this.state.batteryType}
            imageSrc={this.state.imageSrc}
            onBack={() => this.setState({ page: "SCANNERPHOTO" })}
            sendData={() => this.handleSubmit()}
          />
        ) : this.state.page === "SCANNERPHOTO" ? (
          <ScannerPhoto onConfirm={imageSrc => this.onConfirm(imageSrc)} />
        ) : this.state.page === "HOME" ? (
          <>
            <button onClick={() => this.setState({ page: "BARCODESCANNER" })}>
              Open Barcode Scanner
            </button>
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
