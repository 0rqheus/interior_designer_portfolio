import React from "react";

import "./loader.scss";

const Loader = (props) => {

    const width = props.width || "100%";
    const height = props.height || "100%";

    return (
        <div class="loader" style={{height: height, width: width}}>
            <div class="loader-square loader-square_front"></div>
            <div class="loader-square loader-square_back"></div>
            <div class="loader-square loader-square_left"></div>
            <div class="loader-square loader-square_right"></div>
        </div>
    )
}

export default Loader;