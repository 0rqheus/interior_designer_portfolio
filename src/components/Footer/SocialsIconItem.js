import React from "react";

const SocialsIconItem = (props) => {
    return (
        <li>
            <a className="socials-list__link" href={props.item.href}>
                <img className="socials-list__link-icon" src={props.item.src} alt={props.item.alt} />
            </a>
        </li>
    );
};

export default SocialsIconItem;