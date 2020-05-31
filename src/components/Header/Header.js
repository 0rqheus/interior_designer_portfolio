import React from "react";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import { connect } from "react-redux";
import { toggleModal } from "../../actions";
import { LOGIN_MODAL } from "../../modalNames";

import Navbar from "./Navbar/Navbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Modal from "../_partials/Modal/Modal";
import AuthModalContent from "./AuthModalContent";

import "./header.scss";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: auth.currentUser
        };
    }

    signInWithGoogle = () => {

        auth.signInWithPopup(googleProvider)
            .then(this.signIn)
            .catch(console.error);
    }

    signInWithFacebook = () => {

        auth.signInWithPopup(facebookProvider)
            .then(this.signIn)
            .catch(console.error);
    }

    signIn = (result) => {
        this.props.toggleModal(LOGIN_MODAL);

        this.setState({
            user: result.user
        });
    }

    handleLogout = () => {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            })
            .catch(console.error);
    }

    handleLogin = () => {
        this.props.toggleModal(LOGIN_MODAL);
    }

    render() {

        const signInMethods = [
            { name: "Google", signInMethod: this.signInWithGoogle },
            { name: "Facebook", signInMethod: this.signInWithFacebook }
        ];

        return (
            <header className="header">
                <Modal
                    modalId={LOGIN_MODAL}
                    content={() => <AuthModalContent signInMethods={signInMethods} />}
                />
                <Navbar
                    user={this.state.user}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />
                <MobileNavbar
                    user={this.state.user}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />
            </header>
        );
    }
}

const mapDispatchToProps = { toggleModal };

export default connect(null, mapDispatchToProps)(Header);