import React from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../../actions";

import "./modal.scss";
import "./modalContent.scss";
import "./modalForm.scss";

class Modal extends React.Component {

    handleClick = () => {
        this.props.toggleModal(this.props.modalId);
    }

    render() {
        return (
            <div className={`modal ${this.props.displayStatuses.get(this.props.modalId) ? "" : "modal_hidden"}`}>
                <div className="modal__container">
                    <span className="modal__close-btn" onClick={this.handleClick}>&times;</span>

                    <this.props.content />
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        displayStatuses: state.modals
    };
};


const mapDispatchToProps = { toggleModal };

export default connect(mapStateToProps, mapDispatchToProps)(Modal);