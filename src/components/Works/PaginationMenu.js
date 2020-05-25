import React from "react";
import arrowIcon from "../../assets/images/arrow.svg";

import "./paginationMenu.scss";

const PaginationMenu = (props) => {
    return (
        <div className="pagination-menu">
            <img src={arrowIcon} className="pagination-menu__arrow pagination-menu__arrow_left" alt="prev-arrow" onClick={props.onPrev} />

            <p className="pagination-menu__info">
                <span className="current-page">{props.currentPage}</span>
                /
                <span className="pages-amount">{props.pageAmount}</span>
            </p>

            <img src={arrowIcon} className="pagination-menu__arrow" alt="next-arrow" onClick={props.onNext} />
        </div>
    );
};

export default PaginationMenu;