import React from "react";
import { Link } from "react-router-dom";

import AuthContent from "./AuthContent";

const MobileNavList = (props) => {

  const handleLinkClick = (event) => {
    if(event.target.classList.contains("header__link")) {
      props.handleClick();
    }
  }

  return (
    <ul className={`mobile-nav-list ${props.expanded ? "" : "mobile-nav-list_hidden"}`} onClick={handleLinkClick}>
      <li className="mobile-nav-list__item">
        <Link to="/about" className="header__link">About</Link>
      </li>
      <li className="mobile-nav-list__item">
        <Link to="/works" className="header__link">Works</Link>
      </li>
      <li className="mobile-nav-list__item">
        <Link to="/contacts" className="header__link">Contacts</Link>
      </li>
      <li className="mobile-nav-list__item">
        <Link to="/calendar" className="header__link">Calendar</Link>
      </li>

      <div className="mobile-nav-list__auth">
        <AuthContent
          user={props.user}
          handleLogin={props.handleLogin}
          handleLogout={props.handleLogout}
        />
      </div>

    </ul>
  );
}

export default MobileNavList;