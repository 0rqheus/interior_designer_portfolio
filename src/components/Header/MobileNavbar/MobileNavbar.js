import React, { useState } from "react";
import { Link } from "react-router-dom";

import MobileNavList from "./MobileNavList";

import "./mobileNavbar.scss";

const MobileNav = (props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className="mobile-nav">

            <div className="mobile-nav-control-bar">
                <h1>
                    <Link to="/" className="mobile-nav__logo">Orqheus Delusious</Link>
                </h1>
                <button className="header-btn" onClick={handleClick}></button>
            </div>

            <MobileNavList
                handleClick={handleClick}
                expanded={isExpanded}
                user={props.user}
                handleLogin={props.handleLogin}
                handleLogout={props.handleLogout}
            />

        </nav>
    );

};

export default MobileNav;