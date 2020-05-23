import React from "react";
import { db } from "../../firebase";
import { connect } from 'react-redux';
import { setChosenDate, setDayAppointments, setDayToNull } from "../../actions";

import "./calendar.scss";

const Weekdays = () => {
    const weekdaysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return weekdaysData.map((el, index) => {
        return (
            <th key={"weekday" + index} className="calendar__weekday">{el}</th>
        );
    })
}

const MonthName = (props) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <th className="calendar__month" colSpan="5">{months[props.month]}</th>
    )
}

const Weeks = (props) => {
    let weeks = [];
    for (let i = 0; i < 5; i++) {
        weeks.push(
            <tr key={"week" + i}>
                {props.days.slice(i * 7, (i * 7) + 7)}
            </tr>
        )
    }

    return weeks;
}

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            chosenDay: null
        }
    }

    getDays = (date) => {

        const currentDate = new Date();
        const cellsAmount = 35;

        const firstDayWeekday = (new Date(date.getFullYear(), date.getMonth(), 0)).getDay();
        const daysAmount = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();

        const isDateRelevant = (dayNum) => {
            if ((date.getMonth() === currentDate.getMonth()) && (dayNum < currentDate.getDate())) return false;

            return true;
        }

        let days = [];
        let daysBefore = [];
        let daysAfter = [];
        for (let i = 0; i < daysAmount; i++) {
            days.push(
                <td key={"day" + i} className={`calendar__day ${isDateRelevant(i) ? "" : " calendar__disabled-day"}`}>
                    {i + 1}
                </td>
            );

            if (i < firstDayWeekday) {
                daysBefore.push(
                    <td key={"emptyBefore" + i} className="calendar__day calendar__disabled-day"></td>
                )
            }

            if (i < cellsAmount - (firstDayWeekday + daysAmount)) {
                daysAfter.push(
                    <td key={"emptyAfter" + i} className="calendar__day calendar__disabled-day"></td>
                )
            }
        }

        return [...daysBefore, ...days, ...daysAfter];

    }

    selectDay = (newElement) => {
        if (this.state.chosenDay !== null) {
            this.state.chosenDay.classList.remove("calendar__selected-day");
        }

        if(newElement !== null) newElement.classList.add("calendar__selected-day");

        this.setState({
            chosenDay: newElement
        })
    }

    handleClick = (event) => {
        const target = event.target;
        if (target.nodeName === "TD" && !target.classList.contains("calendar__disabled-day")) {
            // set time
            const date = this.state.date;
            this.props.setChosenDate(new Date(date.getFullYear(), date.getMonth(), target.innerText));

            // set day appointments
            db.collection("appointments")
                .where("month", "==", date.getMonth())
                .where("day", "==", Number(target.innerText))
                .get()
                .then(querySnapshot => {

                    if(querySnapshot.docs.length !== 0) this.props.setDayAppointments(querySnapshot.docs[0].id, querySnapshot.docs[0].data().hours)
                    else this.props.setDayToNull();

                })
                .catch(console.error);

            // select day
            this.selectDay(target);
            
        }
    }

    handleNextClick = () => {
        if (this.state.date.getMonth() < (new Date()).getMonth() + 3) {
            this.setState(state => ({
                date: new Date(state.date.getFullYear(), state.date.getMonth() + 1, 1),
            }));

            this.selectDay(null);
        }
    }

    handlePrevClick = () => {
        if (this.state.date.getMonth() > (new Date()).getMonth()) {
            this.setState(state => ({
                date: new Date(state.date.getFullYear(), state.date.getMonth() - 1, 1),
            }));

            this.selectDay(null);
        }
    }

    render() {
        return (
            <table onClick={this.handleClick} className="calendar">
                <thead>
                    <tr className="calendar__header">
                        <th className="calendar__nav-arrow" onClick={this.handlePrevClick}>{"<<"}</th>
                        <MonthName month={this.state.date.getMonth()} />
                        <th className="calendar__nav-arrow" onClick={this.handleNextClick}>{">>"}</th>
                    </tr>
                    <tr>
                        <Weekdays />
                    </tr>
                </thead>
                <tbody>
                    <Weeks days={this.getDays(this.state.date)} />
                </tbody>
            </table>
        );
    }

}

const mapDispatchToProps = { setChosenDate, setDayAppointments, setDayToNull }

export default connect(null, mapDispatchToProps)(Calendar);