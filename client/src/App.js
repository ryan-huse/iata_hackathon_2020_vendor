import React, { Component } from "react";
import "./App.css";
import { BarcodeScanner } from "./BarcodeScanner/BarcodeScanner";
import { Confirmation } from "./Confirmation/Confirmation";
import { ScannerPhoto } from "./ScannerPhoto/ScannerPhoto";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      responseToPost: "",
      page: "HOME",
      userId: "",
      barcodeID: "CI 419454"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  handleFileUpload = e => {
    var demoImage = document.querySelector("img");
    var file = this.fileUpload.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      demoImage.src = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
  };

  // callApi = async () => {
  //   const response = await fetch("/api/hello");
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  handleSubmit = async e => {
    var file = this.fileUpload.files[0];

    const airport = await fetch(
      "https://geolocation-qa-west.azurewebsites.net/api/lookup/resolve"
    )
      .then(async r => await r.json())
      .catch(err => console.log(err));
    var buffer = new Buffer(
      await new Response(file).arrayBuffer(),
      "binary"
    ).toString("base64");
    console.log(buffer);
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: file.name,
        file: buffer,
        length: file.size,
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
    })
      .then(info => console.log(info))
      .catch(err => console.log(err));

    // const body = await response.text();

    this.setState({ responseToPost: "airport" });
  };

  onConfirm = images => {
    console.log(images);
    console.log("setting state");
    this.setState({ post: images });
    this.setState({ page: "HOME" });
  };

  render() {
    return (
      <div className="App">
        {/* {this.state.page === "BARCODESCANNER" ? (
          <BarcodeScanner
            onSuccess={() => this.setState({ page: "SCANNERPHOTO" })}
          />
        ) : this.state.page === "CONFIRMATION" ? (
          <Confirmation onConfirm={() => this.submitData()} />
        ) : this.state.page === "SCANNERPHOTO" ? (
          <ScannerPhoto onConfirm={images => this.onConfirm(images)} />
        ) : this.state.page === "HOME" ? (
          <>
            <button onClick={() => this.setState({ page: "BARCODESCANNER" })}>
              Open Barcode Scanner
            </button>
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </>
        ) : (
          <></>
        )} */}
        Front
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={ref => (this.fileUpload = ref)}
          onChange={this.handleFileUpload}
        ></input>
        <img
          src={this.state.fileUpload ? this.state.fileUpload[0] : ""}
          width="150"
          alt="Thumb preview..."
        ></img>
        <button onClick={e => this.handleSubmit(e.target.value)}>Submit</button>
        <p>{this.state.post}</p>
        <p>{this.state.response}</p>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
