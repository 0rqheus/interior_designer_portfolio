import React from "react";

import WorksItem from "./WorksItem";

import "./worksList.scss";

const WorksList = (props) => {

    if (props.data === null) return null;

    const worksItems = props.data.map(el =>
        <WorksItem key={el.id} item={el} />
    );

    return (
        <ul className="works-list">
            {worksItems}
        </ul>
    );
};

export default WorksList;