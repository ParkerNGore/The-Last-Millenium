import React from "react";
import "./NavManager.css";

function Nav() {
  return (
    <nav>
      <a href="/" className="home-nav">
        Home
      </a>
      <a href="/characters" className="character-nav">
        Characters
      </a>
      <a href="/world" className="world-nav">
        World
      </a>
    </nav>
  );
}

export default Nav;
