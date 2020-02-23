import React, { Component } from "react";

import logo from "./logo.svg";

import "./App.css";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    userId: ""
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

  handleSubmit = async e => {
    e.preventDefault();

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          Barcode #:
          <input
            type="text"
            value={this.state.barcodeID}
            onChange={e => this.setState({ barcodeID: e.target.value })}
          />
          <br />
          Image:
          <input
            type="file"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
