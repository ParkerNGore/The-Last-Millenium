import React from "react";
import "./HomePage.css";
import NavManager from "../components/NavManager";

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <img
          src="the-last-millennium.png"
          alt="The Last Millennium"
          width="100%"
        />
      </header>
      <NavManager />
      <div>Blog Area</div>
    </div>
  );
}

export default HomePage;
