import React from "react";
import Userfront from "@userfront/react";
import HYHMain from "../images/HYHMain.jpg";
import "../stylesheets/login.css";

//login form component from Userfront 
Userfront.init("5nxgy66b");

const LoginForm = Userfront.build({
  toolId: "rlbdod"
});
//--------------------------------

export default function LogIn() {
  return (
    <main className="loginMain">
      <section className="loginLeft">
        <div className="loginTitle">
          <h1 id='logTitle'>Hearts You Hold</h1>
          <h3 id='logSub' style={{textAlign:'center'}}>Admin Portal</h3>
        </div>
        <div>
          <img src={HYHMain} height="100%" width="100%"></img>
        </div>
      </section>
      <div className="loginFormContainer">
        <LoginForm />
      </div>
    </main>
  );
}