import React from "react";
import { Link } from "react-router-dom";

import Auth from "./Auth";

import "./mobileNavbar.scss";

const AnonimousContent = () => {
  return (
    <li className="mobile-nav-list__item_auth">
      <a className="header__link" href="#login">Login</a>
    </li>
  );
}

const AuthorizedContent = () => {
  return (
    <>
    <li className="mobile-nav-list__item_auth">
      <a className="header__link" href="#login">Login</a>
    </li>
    <li className="mobile-nav-list__item_auth">
      <a className="header__link" href="#login">Login</a>
    </li>
    </>
  );
}

const AuthContent = (user) => {
  if(user) {
    return <AnonimousContent/>
  } else {
    return <AuthorizedContent/>
  }
}

export default class MobileNav extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        expanded: false
      }
    }

    handleClick = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    }
  
    render() {
      return (
        <nav className="mobile-nav">
  
          <div className="mobile-nav-control-bar">
            <h1 className="mobile-nav__logo">Orqheus Delusious</h1>
            <button className="header-btn" onClick={this.handleClick}></button>
          </div>
  
          <ul className={`mobile-nav-list ${this.state.expanded ? "" : "mobile-nav-list_hidden"}`}>
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

            { 
              <Auth content={AuthContent}/>
            }

          </ul>
        </nav>
      );
    }
  }