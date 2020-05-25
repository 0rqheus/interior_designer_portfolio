import React from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../actions";
import { PURCHASE_MODAL } from "../../modalNames";

import "./priceBar.scss";

class PriceBar extends React.Component {

    handleClick = () => {
        this.props.toggleModal(PURCHASE_MODAL);
    }

    render() {
        return (
            <div className="pricebar">
                <span className="pricebar__price">${this.props.price}</span>

                <button className="pricebar__buy-btn" onClick={this.handleClick}>Buy</button>
            </div>
        );
    }
}


const mapDispatchToProps = { toggleModal };

export default connect(null, mapDispatchToProps)(PriceBar);