import React from "react";

import "./loader.scss";

const Loader = (props) => {

    const width = props.width || "100%";
    const height = props.height || "100%";

    return (
        <div className="loader" style={{height: height, width: width}}>
            <div className="loader-square loader-square_front"></div>
            <div className="loader-square loader-square_back"></div>
            <div className="loader-square loader-square_left"></div>
            <div className="loader-square loader-square_right"></div>
        </div>
    )
}

export default Loader;