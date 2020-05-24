import React from "react";
import { connect } from "react-redux";
import { toggleModal, setChosenDate } from "../../actions";

import Modal from "../_partials/Modal/Modal";
import AppointmentModalContent from "./AppointmentModalContent";
import Hours from "./Hours";

import "./time.scss";

const MODAL_ID = "appointmentModal";

class Time extends React.Component {

    handleClick = (i) => {

        const chosenDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), i);

        this.props.setChosenDate(chosenDate);
        this.props.toggleModal(MODAL_ID);
    }

    render() {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        return (
            <div className="time">

                <Modal modalId={MODAL_ID} content={() => <AppointmentModalContent modalId={MODAL_ID}/>} />

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
        day: state.chosenDay
    };
};

const mapDispatchToProps = { toggleModal, setChosenDate };

export default connect(mapStateToProps, mapDispatchToProps)(Time);