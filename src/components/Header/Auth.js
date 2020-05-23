import React from "react";
import { connect } from 'react-redux';
import { showModal, hideModal } from "../../actions";
import { auth, googleProvider } from "../../firebase";

import Modal from "../_partials/Modal/Modal"; //
import AuthModalContent from "./AuthModalContent"; //

import "./auth.scss";

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
                this.setState({
                    user: result.user
                });

                this.props.hideModal();
            })
            .catch(console.error);
    }

    handleLogin = () => {
        this.props.showModal();
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
                <Modal content={() => <AuthModalContent signInWithGoogle={this.signInWithGoogle}/>}/> 

                <Content 
                    user={this.state.user} 
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />
            </>
        )
    }
}

const mapDispatchToProps = { showModal, hideModal };

export default connect(null, mapDispatchToProps)(Auth);