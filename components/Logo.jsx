import React from "react";
import icon from "../src/assets/icon.png";

function Logo({ width = "100px" }) {
  return <img src={icon} alt="Logo" style={{ width }} />;
}

export default Logo;
