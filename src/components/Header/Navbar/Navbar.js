import React from "react";

import AuthContent from "./AuthContent";
import NavList from "./NavList";
import Dropdown from "../../_partials/Dropdown/Dropdown";
import DropdownContent from "./DrodownContent";

import "./navbar.scss";

const Navbar = (props) => {

  return (
    <div className="navbar">
      <nav className="nav">
        <NavList />
        <Dropdown
          target={() => <button className="header-btn"></button>}
          content={DropdownContent}
        />
      </nav>

      <AuthContent
        user={props.user}
        handleLogin={props.handleLogin}
        handleLogout={props.handleLogout}
      />
    </div>
  );
}

export default Navbar;