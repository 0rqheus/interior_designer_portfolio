import React from "react";

const AuthorizedContent = (props) => {
    return (
        <>
            <li className="mobile-nav-list__item">
                <div className="mobile-user-info">
                    <span className="mobile-user-info__name">{props.user.displayName}</span>
                    <img className="mobile-user-info__img" src={props.user.photoURL} alt="user avatar"/>
                </div>
            </li>
            <li className="mobile-nav-list__item">
                <a className="header__link" href="#logout" onClick={props.handleLogout}>Logout</a>
            </li>
        </>
    );
}

export default AuthorizedContent;