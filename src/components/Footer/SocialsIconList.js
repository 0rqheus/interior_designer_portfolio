import React from "react";

import SocialsIconItem from "./SocialsIconItem";

const SocialsIconList = (props) => {

    const linkIcons = props.items.map((item, index) => {
        return <SocialsIconItem key={index} item={item}/>;
    });

    return (
        <>
            <ul className="footer__contacts-socials-list">
                {linkIcons}
            </ul>
        </>
    );
};

export default SocialsIconList;