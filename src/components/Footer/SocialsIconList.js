import React from "react";

import SocialsIconItem from "./SocialsIconItem";
import "./socialsList.scss";

const SocialsIconList = (props) => {

    const linkIcons = props.items.map((item, index) => {
        return <SocialsIconItem key={index} item={item}/>;
    });

    return (
        <>
            <ul className="socials-list">
                {linkIcons}
            </ul>
        </>
    );
};

export default SocialsIconList;