import React from "react";
import { connect } from "react-redux";
import { toggleModal, setChosenDate } from "../../actions";

import Modal from "../_partials/Modal/Modal";
import AppointmentModalContent from "./AppointmentModalContent";
import Hours from "./Hours";

import "./time.scss";

const MODAL_ID = "appointmentModal";

class Time extends React.Component {

    handleClick = (event) => {

        const target = event.target;

        if(!target.classList.contains("time__item_booked")) {
            const date = this.props.date;
            const hour = target.dataset.hour;

            console.log(hour);

            const chosenDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +hour);
            this.props.setChosenDate(chosenDate);
            this.props.toggleModal(MODAL_ID);
        }
        
    }

    render() {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        return (
            <div className="time">

                <Modal modalId={MODAL_ID} content={AppointmentModalContent} />

                <h4 className="time__title">Time</h4>

                {
                    this.props.date !== null &&
                    
                    <div>
                        <p className="time__date">
                            {this.props.date.toLocaleDateString("en-GB", options)}
                        </p>
                        <ul className="time__list" onClick={this.handleClick} >
                            <Hours day={this.props.day} date={this.props.date}/>
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