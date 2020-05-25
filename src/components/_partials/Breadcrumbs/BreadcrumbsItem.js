import React from "react";

import { Link} from "react-router-dom";

const BreadcrumbsItem = (props) => {
    return (
        <li className="breadcrumbs__item">
            <Link to={props.link} className="breadcrumbs__link">
                {props.index === 0 ? "/" : props.item}
            </Link>
        </li>
    );
};

export default BreadcrumbsItem;