import React from "react";

import DefaultNavbar from "./DefaultNavbar";
import MobileNavbar from "./MobileNavbar";

import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <DefaultNavbar />
      <MobileNavbar />
    </header>
  );
}

export default Header;