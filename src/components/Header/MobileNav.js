import React from "react";
import { Link } from "react-router-dom";

import "./mobileNav.scss";

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
        <nav className="mobile-menu-nav">
  
          <div className="mobile-menu-control-bar">
            <h1 className="mobile-menu-nav__logo">Orqheus Delusious</h1>
            <button className="menu-additional-btn" onClick={this.handleClick}></button>
          </div>
  
          <ul className={`mobile-menu-list ${this.state.expanded ? "" : "mobile-menu-list_hidden"}`}>
            <li className="mobile-menu-list__item">
              <Link to="/about" className="mobile-menu-list__link">About</Link>
            </li>
            <li className="mobile-menu-list__item">
              <Link to="/works" className="mobile-menu-list__link">Works</Link>
            </li>
            <li className="mobile-menu-list__item">
              <Link to="/contacts" className="mobile-menu-list__link">Contacts</Link>
            </li>
            <li className="mobile-menu-list__item">
              <Link to="/calendar" className="mobile-menu-list__link">Calendar</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }