import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./worksItem.scss";

const WorksItem = (props) => {

    const [isTextVisible, setTextVisibility] = useState(false);

    const mouseOverHandler = () => {
        setTextVisibility(true);
    };

    const mouseOutHandler = () => {
        setTextVisibility(false);
    };

    const getTextClasses = (showTextStatus) => {
        let classesStr = "works-item__name";

        if (showTextStatus) classesStr += " works-item__name_show";

        return classesStr;
    };

    const getImageClasses = (showTextStatus) => {
        let classesStr = "works-item__photo";

        if (showTextStatus) classesStr += " works-item__photo_fade";

        return classesStr;
    };

    return (
        <div className="works-item">

            <Link to={`works/${props.item.objectID}`}>
                <img className={getImageClasses(isTextVisible)}
                    src={props.item.photos[0]}
                    alt={props.item.title}
                    onMouseOver={mouseOverHandler}
                    onMouseOut={mouseOutHandler}
                />
            </Link>


            <p className={getTextClasses(isTextVisible)}>{props.item.title}</p>

        </div>
    );
};

export default WorksItem;