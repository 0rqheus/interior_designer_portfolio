import React from "react";
import { connect } from "react-redux";
import { toggleModal, setChosenDate } from "../../actions";
import { APPOINTMENT_MODAL } from "../../modalNames";

import Hours from "./Hours";

import "./time.scss";

class Time extends React.Component {

    handleClick = (event) => {

        const target = event.target;

        if(!target.classList.contains("time__item_booked")) {
            const date = this.props.date;
            const hour = target.dataset.hour;

            const chosenDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +hour);

            console.log(hour, date, chosenDate);

            this.props.setChosenDate(chosenDate);
            this.props.toggleModal(APPOINTMENT_MODAL);
        }
        
    }

    render() {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        return (
            <div className="time">

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