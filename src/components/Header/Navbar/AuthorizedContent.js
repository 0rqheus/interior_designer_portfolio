import React from "react";

const AuthorizedContent = (props) => {
    return (
        <>
            <div className="user-info">
                <span className="user-info__name">{props.user.displayName}</span>
                <img className="user-info__img" src={props.user.photoURL} alt="user avatar" />
            </div>

            <a className="header__link" href="#logout" onClick={props.handleLogout}>Logout</a>
        </>
    );
};

export default AuthorizedContent;