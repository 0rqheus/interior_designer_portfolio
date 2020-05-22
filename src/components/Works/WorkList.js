import React from "react";

import WorksItem from "./WorksItem";


const WorkList = (props) => {

    if(props.data === null) return null;

    const worksItems = props.data.map((el, index) =>
            <WorksItem key={el.id} item={el} />
    );

    return (
        <ul className="works-list">
            {worksItems}
        </ul>
    )
}

export default WorkList;