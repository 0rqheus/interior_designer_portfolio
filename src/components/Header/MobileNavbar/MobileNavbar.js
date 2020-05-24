import React from "react";
import { Link } from "react-router-dom";

import MobileNavList from "./MobileNavList";

import "./mobileNavbar.scss";

export default class MobileNav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    handleClick = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    }

    render() {
        return (
            <nav className="mobile-nav">

                <div className="mobile-nav-control-bar">
                    <h1>
                        <Link to="/" className="mobile-nav__logo">Orqheus Delusious</Link>
                    </h1>
                    <button className="header-btn" onClick={this.handleClick}></button>
                </div>

                <MobileNavList
                    handleClick={this.handleClick}
                    expanded={this.state.expanded}
                    user={this.props.user}
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                />

            </nav>
        );
    }
}