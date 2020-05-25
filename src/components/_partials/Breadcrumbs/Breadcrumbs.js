import React from "react";
import { useLocation } from "react-router-dom";

import BreadCrumbsItem from "./BreadcrumbsItem";

import "./breadcrumbs.scss";

const BreadCrumbs = () => {
    const location = useLocation();

    const pathsList = location.pathname.split("/").map((item, index, arr) => {

        const link = arr.slice(0, index + 1).join("/");

        return (
            <BreadCrumbsItem
                key={item}
                item={item} 
                link={link} 
                index={index}
            />
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