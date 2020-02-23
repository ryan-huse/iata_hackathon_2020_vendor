import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

import { BarcodeScanner } from "./BarcodeScanner/BarcodeScanner";
import { Confirmation } from "./Confirmation/Confirmation";
import { ScannerPhoto } from "./ScannerPhoto/ScannerPhoto";
import { Login } from "./Login/Login";
import { WheelchairInfo } from "./WheelchairInfo/WheelchairInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      responseToPost: "",
      page: "LOGIN",
      userId: "",
      imageSrc: "",
      barcodeID: "90060000001",
      flightInfo: "CI 0757-SEA",
      batteryType: "Wet Cell - WCBW",
      imageFile: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  handleSubmit = async e => {
    const airport = await fetch(
      "https://geolocation-qa-west.azurewebsites.net/api/lookup/resolve"
    )
      .then(async r => await r.json())
      .catch(err => console.log(err));
    var buffer = new Buffer(
      await new Response(this.state.imageFile).arrayBuffer(),
      "binary"
    ).toString("base64");

    console.log(buffer);

    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.imageFile.name,
        file: buffer,
        length: this.state.imageFile.size,
        barcodeID: this.state.barcodeID,
        airline: "Delta",
        photographer: "0323305",
        date: new Date(),
        airport: airport
          ? airport.ResolvedCity
            ? airport.ResolvedCity.NearestAlaskaDestination
              ? airport.ResolvedCity.NearestAlaskaDestination.Code
              : ""
            : ""
          : ""
      })
    })
      .then(info => console.log(info))
      .catch(err => console.log(err));

    // const body = await response.text();

    this.setState({ responseToPost: "airport" });
  };

  onConfirm = imageSrc => {
    console.log(imageSrc);
    console.log("setting state");
    this.setState({ post: imageSrc });
    this.setState({ imageSrc: imageSrc });
    this.setState({ page: "CONFIRMATION" });
  };

  onCallGuest = () => {
    console.log("on call guest: not yet implemented");
  };

  render() {
    const fileUploadRef = React.createRef();

    return (
      <div className="App">
        {this.state.page === "LOGIN" ? (
          <Login onLogin={() => this.setState({ page: "BARCODESCANNER" })} />
        ) : this.state.page === "BARCODESCANNER" ? (
          <BarcodeScanner
            onSuccess={() => this.setState({ page: "WHEELCHAIRINFO" })}
          />
        ) : this.state.page === "WHEELCHAIRINFO" ? (
          <WheelchairInfo
            batteryType={this.state.batteryType}
            onCallGuest={this.onCallGuest}
            setImageFile={imageFile => this.setState({ imageFile: imageFile })}
            showNextPage={() => {
              this.setState({ page: "CONFIRMATION" });
            }}
          />
        ) : this.state.page === "SCANNERPHOTO" ? (
          <ScannerPhoto
            onChange={this.handle}
            onConfirm={imageSrc => this.onConfirm(imageSrc)}
            fileUploadRef={fileUploadRef}
            handleSubmit={value => this.handleSubmit(value)}
          />
        ) : this.state.page === "CONFIRMATION" ? (
          <Confirmation
            barcodeID={this.state.barcodeID}
            flightInfo={this.state.flightInfo}
            batteryType={this.state.batteryType}
            onBack={() => this.setState({ page: "SCANNERPHOTO" })}
            handleSubmit={() => this.handleSubmit()}
            onExit={() => this.setState({ page: "LOGIN" })}
            imageFile={this.state.imageFile}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
