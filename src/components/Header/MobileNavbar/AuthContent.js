import React from "react";

import AuthorizedContent from "./AuthorizedContent";
import AnonimousContent from "./AnonimousContent";

const AuthContent = (props) => {
    return (
        <>
            {
                props.user !== null
                    ? <AuthorizedContent user={props.user} handleLogout={props.handleLogout} />
                    : <AnonimousContent handleLogin={props.handleLogin} />
            }
        </>
    );
};

export default AuthContent;