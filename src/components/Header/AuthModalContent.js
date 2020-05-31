import React from "react";

const AuthModalContent = (props) => {

    const signInBtns = props.signInMethods.map(item => {
        return (
            <button key={item.name} className="modal-content__btn modal-content__btn_large" onClick={item.signInMethod}>
                Login in with {item.name}
            </button>
        );
    });

    return (
        <div className="modal-content">

            <h4 className="modal-content__header">Login</h4>

            <>
                {signInBtns}
            </>

        </div>
    );
};

export default AuthModalContent;