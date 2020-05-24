import React from "react";

import AuthorizedContent from "./AuthorizedContent";

const AuthContent = (props) => {

    const user = props.user;

    return (
        <div className="auth-bar">
            {
                user !== null
                    ? (<AuthorizedContent user={user} handleLogout={props.handleLogout}/>)
                    : (<a className="header__link" href="#login" onClick={props.handleLogin}>Login</a>)
            }
        </div>
    );
}

export default AuthContent;