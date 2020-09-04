import React from "react";
import NavManager from "../components/NavManager";
import "./WorldPage.css";

function WorldPage() {
  return (
    <div className="world-page">
      <header>
        <img
          src="the-last-millennium.png"
          alt="The Last Millennium"
          width="100%"
        />
      </header>
      <NavManager />
      <div className="world-map-container">
        <img
          src="world.jpg"
          alt="World Map"
          className="world-map"
          width="800"
          height="500"
        />
      </div>
      <footer>Placeholder</footer>
    </div>
  );
}

export default WorldPage;
