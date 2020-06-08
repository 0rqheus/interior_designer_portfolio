import React from "react";

import WorksItem from "./WorksItem";

import "./worksList.scss";

const WorksList = (props) => {

    const { data } = props;

    if (data === null) return null;

    const worksItems = data.map(el =>
        <WorksItem key={el.id} item={el} />
    );

    return (
        <ul className="works-list">
            {worksItems}
        </ul>
    );
};

export default WorksList;