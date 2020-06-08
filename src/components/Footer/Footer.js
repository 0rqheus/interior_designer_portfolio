import React from "react";

import twitterLogo from "../../assets/images/twitter_logo.png";
import facebookLogo from "../../assets/images/facebook_logo.png";
import instagramLogo from "../../assets/images/instagram_logo.png";
import linkedInLogo from "../../assets/images/linkedIn_logo.png";

import SocialsIconList from "./SocialsIconList";

import "./footer.scss";

const Footer = () => {

    const socialLinkIcons = [
        { src: twitterLogo, alt: "twitter logo", href: "http://twitter.com" },
        { src: facebookLogo, alt: "facebook logo", href: "http://fb.com" },
        { src: instagramLogo, alt: "instagram logo", href: "http://instagram.com" },
        { src: linkedInLogo, alt: "linkedin logo", href: "http://linkedin.com" },
    ];


    return (
        <footer className="footer">

            <div className="footer__content">

                <p className="footer__logo">Orqheus Delusious</p>

                <div className="footer__contacts">
                    <span className="footer__contacts-email">myemail@example.com</span>

                    <SocialsIconList items={socialLinkIcons} /> 
                </div>

            </div>

            <p className="footer__rights">All rights reserved. Copyright 2020. This project is just example.</p>
        </footer>
    );
};

export default Footer;