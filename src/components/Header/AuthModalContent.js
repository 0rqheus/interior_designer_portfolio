import React from "react";

const AuthModalContent = (props) => {
    return (
        <div className="modal-content">

            <h4 className="modal-content__header">Login</h4>

            <button className="modal-content__btn modal-content__btn_large" onClick={props.signInWithGoogle}>
                Login in with Google
            </button>

        </div>
    );
}

export default AuthModalContent;