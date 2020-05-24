import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./breadcrumbs.scss";

const BreadCrumbs = () => {
    const location = useLocation();

    const pathsList = location.pathname.split("/").map((item, index, arr) => {

        const link = arr.slice(0, index+1).join("/");

        return (
            <li key={item} className="breadcrumbs__item">
                <Link to={link} className="breadcrumbs__link">
                    {index === 0 ? "/" : item}
                </Link>
            </li>
        );
    });

    return (
        <div className="breadcrumbs">
            <ul className="breadcrumbs__paths-list">
                {pathsList}
            </ul>
        </div>
    );
};

export default BreadCrumbs;