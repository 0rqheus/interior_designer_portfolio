import React from "react";
import { useDispatch } from "react-redux";
import { PURCHASE_MODAL } from "../../modalNames";

import "./priceBar.scss";

const PriceBar = (props) => {

    const dispatch = useDispatch();

    return (
        <div className="pricebar">
            <span className="pricebar__price">${props.price}</span>

            <button
                className="pricebar__buy-btn"
                onClick={() => dispatch({ type: "TOGGLE_MODAL", modalName: PURCHASE_MODAL })}
            >
                Buy
            </button>
        </div>
    );

};

export default PriceBar;