import React from "react";
import { connect } from 'react-redux';
import { toggleModal } from "../../actions";
import { auth, googleProvider } from "../../firebase";

import Modal from "../_partials/Modal/Modal"; //
import AuthModalContent from "./AuthModalContent"; //

import "./auth.scss";

const MODAL_ID = "loginModal";

class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    signInWithGoogle = () => {

        auth.signInWithPopup(googleProvider)
            .then( result => {

                this.props.toggleModal(MODAL_ID);

                this.setState({
                    user: result.user
                });
            })
            .catch(console.error);
    }

    handleLogin = () => {
        this.props.toggleModal(MODAL_ID);
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

    render() {

        const Content = this.props.content;

        return (
            <>
                <Modal modalId={MODAL_ID} content={() => <AuthModalContent signInWithGoogle={this.signInWithGoogle}/>}/> 

                <Content 
                    user={this.state.user} 
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />
            </>
        )
    }
}

const mapDispatchToProps = { toggleModal };

export default connect(null, mapDispatchToProps)(Auth);