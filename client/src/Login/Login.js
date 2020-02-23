import React from "react";
import login_bottom from "./login_bottom.png";
import login_top from "./login_top.png";
import "./Login.scss";

export const Login = function({ onLogin }) {
  return (
    <div className="">
      <img src={login_top} className="img-login" alt="Login" />
      <div className="buttons">
        <button className="button-login primary" onClick={() => onLogin()}>
          Continue
        </button>
      </div>
      <img className="img-login" src={login_bottom} />
    </div>
  );
};
