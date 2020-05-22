import React from "react";
import arrowIcon from "../../assets/images/arrow.svg";

const PaginationMenu = (props) => {
    return (
        <div className="pagination-menu">
            <img src={arrowIcon} className="pagination-menu__btn pagination-menu__btn_left" alt="prev-arrow" onClick={props.onPrev}/>

            <p className="pagination-menu__info">
                <span className="current-page">{props.currentPage}</span>
                /
                <span className="pages-amount">{props.pageAmount}</span>
            </p>

            <img src={arrowIcon} className="pagination-menu__btn" alt="next-arrow" onClick={props.onNext}/>
        </div>
    )
}

export default PaginationMenu;