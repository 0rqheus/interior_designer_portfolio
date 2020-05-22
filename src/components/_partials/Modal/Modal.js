import React from "react";
import { connect } from 'react-redux';
import { hideModal } from "../../../actions";

import "./modal.scss"

class Modal extends React.Component {

    handleClick = () => {
        this.props.hideModal();
    }

    render() {
        return (
            <div className={`modal ${this.props.display ? "" : "modal_hidden"}`}>
                    <div className="modal__container">
                        <span className="modal__close-btn" onClick={this.handleClick}>&times;</span>
    
                        <this.props.content data={this.props.data}/>
                    </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        display: state.modalDisplayStatus,
        data: state.data
    };
}


const mapDispatchToProps = { hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(Modal);