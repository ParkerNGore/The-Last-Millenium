import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner({ type = "roller" }) {
  let spinner;

  if (type === "roller") {
    spinner = (
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else if (type === "facebook") {
    spinner = (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return <div className="loading-spinner-container">{spinner}</div>;
}

export default LoadingSpinner;
