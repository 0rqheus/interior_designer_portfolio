import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "../_partials/Dropdown/Dropdown";

const DropdownTarget = () => {
  return (
    <button className="menu-additional-btn"></button>
  );
}

const DropdownContent = () => {
  return (
    <ul className="additional-menu-list">
      <li className="additional-menu-list__item">
        <Link to="/calendar" className="menu-list__link">Calendar</Link>
      </li>
    </ul>
  );
}

const DefaultNav = () => {
  return (
    <nav className="menu-nav">
      <ul className="menu-list">
        <li className="menu-list__item">
          <Link to="/" className="menu-list__link">Home</Link>
        </li>
        <li className="menu-list__item">
          <Link to="/about" className="menu-list__link">About</Link>
        </li>
        <li className="menu-list__item">
          <Link to="/works" className="menu-list__link">Works</Link>
        </li>
        <li className="menu-list__item">
          <Link to="/contacts" className="menu-list__link">Contacts</Link>
        </li>
      </ul>
      <Dropdown target={DropdownTarget} content={DropdownContent} />
    </nav>
  );
}

export default DefaultNav;