import React from "react";
import { Link } from "react-router-dom";

import "./dropdownContent.scss";

const DropdownContent = () => {
    return (
        <ul className="dropdown-content-list">
            <li className="dropdown-content-list__item">
                <Link to="/calendar" className="header__link">Calendar</Link>
            </li>
        </ul>
    );
};

export default DropdownContent;