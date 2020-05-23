import React from "react";
import { Link } from "react-router-dom";


import Dropdown from "../_partials/Dropdown/Dropdown";
import Auth from "./Auth";

import "./defaultNavbar.scss";

const DropdownTarget = () => {
  return (
    <button className="header-btn"></button>
  );
}

const DropdownContent = () => {
  return (
    <ul className="dropdown-content-list">
      <li className="dropdown-content-list__item">
        <Link to="/calendar" className="header__link">Calendar</Link>
      </li>
    </ul>
  );
}

const NavList = () => {
  return (
    <ul className="nav-list">
      <li className="nav-list__item">
        <Link to="/" className="header__link">Home</Link>
      </li>
      <li className="nav-list__item">
        <Link to="/about" className="header__link">About</Link>
      </li>
      <li className="nav-list__item">
        <Link to="/works" className="header__link">Works</Link>
      </li>
      <li className="nav-list__item">
        <Link to="/contacts" className="header__link">Contacts</Link>
      </li>
    </ul>
  );
}

const AuthContent = (props) => {

  const user = props.user;

  return (
    <div className="auth-bar">
        {user === null
            ? (<a className="header__link" href="#login" onClick={props.handleLogin}>Login</a>)
            : (
                <>
                  <div className="user-info">
                      <span className="user-info__name">{user.displayName}</span>
                      <img className="user-info__img" src={user.photoURL} alt="user avatar"/>
                  </div>

                  <a className="header__link" href="#logout" onClick={props.handleLogout}>Logout</a>
                </>
            )
        }
    </div>
  );
}

const DefaultNavbar = () => {
  return (
    <div className="navbar">
      <nav className="nav">
        <NavList/>
        <Dropdown target={DropdownTarget} content={DropdownContent} />
      </nav>

      <Auth content={AuthContent}/>
    </div>
  );
}

export default DefaultNavbar;