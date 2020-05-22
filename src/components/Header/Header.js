import React from "react";

import DefaultNav from "./DefaultNav";
import MobileNav from "./MobileNav";

import "./header.scss";

const Header = () => {
  return (
    <header className="menu-header">
      <DefaultNav />
      <MobileNav />
    </header>
  );
}

export default Header;