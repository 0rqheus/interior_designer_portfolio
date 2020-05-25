import React from "react";

const SocialsIconItem = (props) => {
    return (
        <li>
            <a className="footer__link" href={props.item.href}>
                <img className="footer__link-icon" src={props.item.src} alt={props.item.alt} />
            </a>
        </li>
    );
};

export default SocialsIconItem;