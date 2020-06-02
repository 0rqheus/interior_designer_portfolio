import React from "react";
import "./about.scss";

import myPhoto from "../../assets/images/person.jpg";

const About = () => {

    const bornYear = 1990;
    const awards = [
        "2012 - Main minimalism design",
        "June 2017 - Best bedroom concept",
        "March 2018 - 'Best ecology house' award"
    ];

    const awardsList = awards.map((item, index) => {
        return (
            <li key={index}>
                <p className="about__description">
                    {item}
                </p>
            </li>
        );
    });

    return (
        <div className="about">

            <div className="about__img-container">
                <img className="about__person-img" src={myPhoto} alt="portfolio owner" />
            </div>

            <div className="about__info">
                <section>
                    <h4 className="about__header">Hello!</h4>
                    <p className="about__description">
                        {`My name is Orqheus and I'm ${(new Date()).getFullYear() - bornYear} now. I'm professional interior designer with 10 years experience.`}
                    </p>
                    <p className="about__description">
                        {"Nowadays i'm living in Kiew, Ukraine, also i got an education here in the National Design University. Moreover i passed NCIDQ exam in 2012 and got Council for Interior Design Qualification (CIDQ) certification."}
                    </p>
                    <p className="about__description">
                        {"My favourite styles are minimalism and futurism."}
                    </p>
                </section>

                <section>
                    <h4 className="about__header">Skills</h4>
                    <p className="about__description">
                        {`I'm very curious person and always trying to explore somethign new.
                        I like to investigate current trends to get max of them and create somethign unique.`}
                    </p>
                    <p className="about__description">
                        {"And of course I can work with such programs like 'Adobe Photoshop', 'SketchUp Pro', 'Autodesk AutoCAD LT' and 'Blender 3D' on advanced level."}
                    </p>
                    <p className="about__description">
                        {"I've worked in a lot of companies with very different people and can interract with anyone."}
                    </p>
                </section>

                <section>
                    <h4 className="about__header">Honours & Awards</h4>
                    <ul className="about__list">
                        {awardsList}
                    </ul>
                </section>
            </div>


        </div>
    );
};

export default About;