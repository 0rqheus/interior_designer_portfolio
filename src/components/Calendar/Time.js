import React from "react";
import { connect } from 'react-redux';
import { showModal, setupAppointmentHours } from "../../actions";

import Modal from "../_partials/Modal/Modal";
import ModalContent from "./ModalContent"
import Hours from "./Hours";

import "./time.scss"


class Time extends React.Component {

    handleClick = (i) => {

        const chosenDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), i);

        this.props.setupAppointmentHours(chosenDate);
        this.props.showModal();
    }

    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return (
            <div className="time">

                <Modal content={() => <ModalContent/>} />

                <h4 className="time__title">Time</h4>

                {
                    this.props.date !== null &&
                    <div>
                        <p>
                            {this.props.date.toLocaleDateString("en-GB", options)}
                        </p>
                        <ul className="time__list">
                            <Hours day={this.props.day} date={this.props.date} onClick={this.handleClick} />
                        </ul>
                    </div>
                }
                
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        date: state.chosenDate,
        day: state.day
    };
}

const mapDispatchToProps = { showModal, setupAppointmentHours };

export default connect(mapStateToProps, mapDispatchToProps)(Time);