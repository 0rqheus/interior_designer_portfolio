import React from "react";

import Slider from "../_partials/Slider/Slider";
import sliderImg1 from "../../assets/images/slider1.jpg";
import sliderImg2 from "../../assets/images/slider2.jpg";
import sliderImg3 from "../../assets/images/slider3.jpg";
import Greet from "./Greet";

import "./home.scss";

const Home = () => {
    const photos = [sliderImg1, sliderImg2, sliderImg3];

    return (
        <div className="home">
            <Greet />
            <Slider containerClass={"home__section"} photos={photos} />
        </div>
    );
};

export default Home;