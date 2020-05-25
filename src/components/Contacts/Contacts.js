import React from "react";
import { Link } from "react-router-dom";
import "./contacts.scss";

const Contacts = () => {

    const emailAddress = "myemail@example.com";
    const officeAddress = "street SomeName 14A, Kyiv";

    const socialLinks = [
        { name: "Twitter", href: "http://twitter.com" },
        { name: "Facebook", href: "http://fb.com" },
        { name: "Instagram", href: "http://instagram.com" },
        { name: "LinkedIn", href: "http://linkedin.com" },
    ].map((item, index) => {
        return (
            <li key={index}>
                <a className="contacts__link" href={item.href}>{item.name}</a>
            </li>
        );
    });

    return (
        <div className="contacts">

            <div className="contacts__text">
                <p>Your can always reach me on <b>{emailAddress}</b></p>

                <p>{"I'm also on a few social networks, so check me out on:"}</p>

                <ul className="contacts__social-networks-list">
                    {socialLinks}
                </ul>

                <p>
                    Also you can <Link to="/calendar" className="contacts__link">make an appointment</Link> and meet me personally to discuss work
                </p>

            </div>

            <div className="location">

                <p className="location__info">My office located at <b>{officeAddress}</b></p>

                <iframe
                    className="location__map"
                    title="Inline Frame Example"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=30.45321643352509%2C50.447117078695136%2C30.45847356319428%2C50.44856032028944&amp;layer=mapnik"
                ></iframe>
            </div>

        </div>
    );
};

export default Contacts;