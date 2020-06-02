import React, { useState } from "react";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { LOGIN_MODAL } from "../../modalNames";

import Navbar from "./Navbar/Navbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Modal from "../_partials/Modal/Modal";
import AuthModalContent from "./AuthModalContent";

import "./header.scss";

const Header = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(auth.currentUser);

    const signInWithGoogle = () => {

        auth.signInWithPopup(googleProvider)
            .then(signIn)
            .catch(console.error);
    };

    const signInWithFacebook = () => {

        auth.signInWithPopup(facebookProvider)
            .then(signIn)
            .catch(console.error);
    };

    const signIn = (result) => {
        dispatch({ type: "TOGGLE_MODAL", modalName: LOGIN_MODAL });
        setUser(result.user);
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => setUser(null))
            .catch(console.error);
    };

    const handleLogin = () => {
        dispatch({ type: "TOGGLE_MODAL", modalName: LOGIN_MODAL });
    };


    const signInMethods = [
        { name: "Google", signInMethod: signInWithGoogle },
        { name: "Facebook", signInMethod: signInWithFacebook }
    ];

    return (
        <header className="header">
            <Modal
                modalId={LOGIN_MODAL}
                content={() => <AuthModalContent signInMethods={signInMethods} />}
            />
            <Navbar
                user={user}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
            <MobileNavbar
                user={user}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
        </header>
    );
};

export default Header;