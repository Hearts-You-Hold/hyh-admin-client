import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Userfront from "@userfront/react";
import NavBar from "./NavBar";
import HYHGlobe from "../images/HYHGlobe.png";

export default function Dashboard() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  //getting time of day to the second and current date
  function getTime() {
    setTimeout(() => {
      setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    });
    return time;
  }
  getTime();

  function getDate() {
    let currentDate = new Date();
    let newDate = currentDate.toUTCString();
    newDate = newDate.slice(0, 17);
    setDate(newDate);
  }

  useEffect(getDate, []);
  //--------------------------------------------------

  //allowing access to this component only if user is logged in - if not, redirect to login page
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //--------------------------------------------------------------------------------------------------
  return (
    <main>
      <NavBar />
      <section className="dashHeader">
        <div>
          <h1 id="dashTitle" style={{ fontSize: "60px" }}>
            Welcome, Eloise!
          </h1>
          <p id="date" style={{ fontSize: "20px" }}>
            {" "}
            It is {date} at {time}{" "}
          </p>
        </div>
        <img id="dashImg" src={HYHGlobe} width="25%" />
      </section>
    </main>
  );
}
