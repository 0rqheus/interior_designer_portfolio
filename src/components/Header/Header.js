import React from "react";
import { auth, googleProvider } from "../../firebase";
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
            user: null
        };
    }

    signInWithGoogle = () => {

        auth.signInWithPopup(googleProvider)
            .then(result => {

                this.props.toggleModal(LOGIN_MODAL);

                this.setState({
                    user: result.user
                });
            })
            .catch(console.error);
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
        return (
            <header className="header">
                <Modal
                    modalId={LOGIN_MODAL}
                    content={() => <AuthModalContent signInWithGoogle={this.signInWithGoogle} />}
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