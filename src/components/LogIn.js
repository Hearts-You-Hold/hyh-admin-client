import React, { useState } from "react";
// import Userfront from "@userfront/react";
import Userfront from "@userfront/core";
import HYHMain from "../images/HYHMain.jpg";
import HYHGlobe from "../images/HYHGlobe.png";
import view from "../images/view.png";
import hide from "../images/hide.png";
import "../stylesheets/login.css";

//login form component from Userfront
Userfront.init("5nxgy66b");

// const LoginForm = Userfront.build({
//   toolId: "rlbdod"
// });

//--------------------------------

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordViewClicked, setPasswordViewClicked] = useState(false);

  function handleSubmit(e) {
    setAlert("");
    e.preventDefault();
    Userfront.login({
      method: "password",
      emailOrUsername: email,
      password: password,
    }).catch((error) => {
      setError(true);
      setAlert("Incorrect email or password");
    });
  }

  //handling view password button click
  function passwordView() {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordViewClicked(true);
    } else {
      setPasswordType("password");
      setPasswordViewClicked(false);
    }
  }

  return (
    <main className="loginMain">
      <section className="loginLeft">
        <div className="loginTitle">
          <h1 id="logTitle">Hearts You Hold</h1>
          <h3 id="logSub" style={{ textAlign: "center" }}>
            Admin Portal
          </h3>
        </div>
        <div>
          <img src={HYHMain} height="100%" width="100%"></img>
        </div>
      </section>
      <div className="loginFormContainer">
        <form id="loginForm" autoComplete="off" onSubmit={handleSubmit}>
          <img src={HYHGlobe} width="40%" />
          <div className="input">
            <label>Email </label>
            <input
              name="emailOrUsername"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <div>
              <label>Password</label>
              {/* Showing or hiding password on click */}
              <button id="viewPassword" type="button" onClick={passwordView}>
                {passwordViewClicked ? (
                  <img src={hide} width="100%" />
                ) : (
                  <img src={view} width="100%" />
                )}
              </button>
            </div>
            <input
              name="password"
              type={passwordType}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button id="loginBtn" type="submit">
            Log in
          </button>
          <button
            id="resetBtn"
            type="button"
            onClick={() => (window.location.href = "/reset")}
          >
            Reset Password
          </button>
          {error ? <p id="alertMsg">{alert}</p> : null}
        </form>
      </div>
    </main>
  );
}
