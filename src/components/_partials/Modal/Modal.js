import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./modal.scss";
import "./modalContent.scss";
import "./modalForm.scss";

const Modal = (props) => {

    const dispatch = useDispatch();
    const displayStatuses = useSelector(state => state.modals);

    return (
        <div className={`modal ${displayStatuses.get(props.modalId) ? "" : "modal_hidden"}`}>
            <div className="modal__container">
                <span 
                    className="modal__close-btn" 
                    onClick={() => dispatch({type: "TOGGLE_MODAL", modalName: props.modalId})}
                >
                    &times;
                </span>

                <props.content />
            </div>
        </div>
    );

};

export default Modal;