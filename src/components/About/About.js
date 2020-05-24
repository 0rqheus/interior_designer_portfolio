import React from "react";
import "./about.scss";

import myPhoto from "../../assets/images/person.jpg";

const About = () => {

    const bornYear = 1990;

    return (
        <div className="about">

            <div className="about__img-container">
                <img className="about__person-img" src={myPhoto} alt="portfolio owner" />
            </div>

            <div className="about__info">
                <section>
                    <h4 className="about__header">Hello!</h4>
                    <p className="about__description">
                        My name is Orqheus and I&quotm {(new Date()).getFullYear() - bornYear} now. I&quotm professional interior designer with 10 years experience.
                    </p>
                    <p className="about__description">
                        Nowadays i&quotm living in Kiew, Ukraine, also i got an education here in the National Design University. Moreover i passed NCIDQ exam in 2012 and got Council for Interior Design Qualification (CIDQ) certification.
                    </p>
                    <p className="about__description">
                        My favourite styles are minimalism and futurism.
                    </p>
                </section>

                <section>
                    <h4 className="about__header">Skills</h4>
                    <p className="about__description">
                        I&quotm very curious person and always trying to explore somethign new.
                        I like to investigate current trends to get max of them and create somethign unique.
                    </p>
                    <p className="about__description">
                        And of course I can work with such programs like &quotAdobe Photoshop&quot, &quotSketchUp Pro&quot, &quotAutodesk AutoCAD LT&quot and &quotBlender 3D&quot on advanced level.
                    </p>
                    <p className="about__description">
                        I`ve worked in a lot of companies with very different people and can interract with anyone.
                    </p>
                </section>

                <section>
                    <h4 className="about__header">Honours & Awards</h4>
                    <ul className="about__list">
                        <li>
                            <p className="about__description">
                                2012 - Main minimalism design
                            </p>
                        </li>
                        <li>
                            <p className="about__description">
                                June 2017 - Best bedroom concept
                            </p>
                        </li>
                        <li>
                            <p className="about__description">
                                March 2018 - &quotBest ecology house&quot award
                            </p>
                        </li>
                    </ul>
                </section>
            </div>


        </div>
    );
};

export default About;