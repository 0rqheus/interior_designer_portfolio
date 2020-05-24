import React from "react";

const AnonimousContent = (props) => {
    return (
        <li className="mobile-nav-list__item">
            <a className="header__link" href="#login" onClick={props.handleLogin}>Login</a>
        </li>
    );
}

export default AnonimousContent;