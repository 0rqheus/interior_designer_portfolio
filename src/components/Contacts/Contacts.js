import React from "react";
import { Link } from "react-router-dom";
import "./contacts.scss";

const Contacts = () => {

  return (
    <div className="contacts">
      <p className="contacts__text">Your can always reach me on <b>myemail@example.com</b></p>

      <div className="location">

        <p className="location__info">My office located at <b>street SomeName 14A, Kyiv</b></p>

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

      <p className="contacts__text">
        Also you can <Link to="/calendar" className="contacts__appointment-link">make an appointment</Link> and meet me personally to discuss work
      </p>

    </div>
  );
}

export default Contacts;