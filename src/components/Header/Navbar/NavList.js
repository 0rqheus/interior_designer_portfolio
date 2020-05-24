import React from "react";
import { Link } from "react-router-dom";

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

export default NavList;