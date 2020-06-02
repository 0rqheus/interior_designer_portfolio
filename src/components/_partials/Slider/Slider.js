import React, { useState } from "react";

import arrowIcon from "../../../assets/images/arrow.svg";
import "./slider.scss";

const Slider = (props) => {

    const [currImgPos, setCurrImgPos] = useState(0);

    const handlePrevClick = () => {
        if (props.photos.length !== 0 && currImgPos > 0)
            setCurrImgPos(currImgPos-1);
    };

    const handleNextClick = () => {
        if (props.photos.length !== 0 && (currImgPos < props.photos.length - 1))
            setCurrImgPos(currImgPos+1);
    };

    return (
        <div className={`slider ${props.containerClass || ""}`}>
            <img className="slider__img" src={props.photos[currImgPos]} alt={props.photos[currImgPos]} />

            <img src={arrowIcon} className="slider__arrow-icon slider__arrow-icon_left" alt="prev-arrow" onClick={handlePrevClick} />
            <img src={arrowIcon} className="slider__arrow-icon" alt="next-arrow" onClick={handleNextClick} />
        </div>
    );
};

export default Slider;