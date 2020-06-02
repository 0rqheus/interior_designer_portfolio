import React, { useState } from "react";
import { db } from "../../../firebase";
import { useDispatch } from "react-redux";

import MonthName from "./MonthName";
import Weeks from "./Weeks";
import Weekdays from "./Weekdays";

import "./calendar.scss";

const Calendar = () => {

    const [chosenTdDay, setChosenTdDay] = useState(null);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    const getDays = (date) => {

        const currentDate = new Date();
        const cellsAmount = 35;

        const firstDayWeekday = (new Date(date.getFullYear(), date.getMonth(), 0)).getDay();
        const daysAmount = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();

        const isDateRelevant = (dayNum) => {
            if ((date.getMonth() === currentDate.getMonth()) && (dayNum < currentDate.getDate())) return false;

            return true;
        };

        const days = [];
        const daysBefore = [];
        const daysAfter = [];
        for (let i = 0; i < daysAmount; i++) {
            days.push(
                <td key={"day" + i} className={`calendar__day ${isDateRelevant(i) ? "" : " calendar__disabled-day"}`}>
                    {i + 1}
                </td>
            );

            if (i < firstDayWeekday) {
                daysBefore.push(
                    <td key={"emptyBefore" + i} className="calendar__day calendar__disabled-day"></td>
                );
            }

            if (i < cellsAmount - (firstDayWeekday + daysAmount)) {
                daysAfter.push(
                    <td key={"emptyAfter" + i} className="calendar__day calendar__disabled-day"></td>
                );
            }
        }

        return [...daysBefore, ...days, ...daysAfter];

    };

    const selectDay = (newElement) => {
        if (chosenTdDay !== null)
            chosenTdDay.classList.remove("calendar__selected-day");

        if (newElement !== null) 
            newElement.classList.add("calendar__selected-day");

        setChosenTdDay(newElement);
    };

    const handleClick = (event) => {
        const target = event.target;

        if (target.nodeName === "TD" && !target.classList.contains("calendar__disabled-day")) {
            // set time
            dispatch({
                type: "SET_CHOSEN_DATE",
                chosenDate: new Date(date.getFullYear(), date.getMonth(), target.innerText)
            });

            // set day appointments
            db.collection("appointments")
                .where("month", "==", date.getMonth())
                .where("day", "==", Number(target.innerText))
                .get()
                .then(querySnapshot => {

                    if (querySnapshot.docs.length !== 0) {
                        const firstResult = querySnapshot.docs[0];

                        dispatch({
                            type: "SET_DAY_APPOINTMENTS",
                            dayId: firstResult.id,
                            appointmentHours: firstResult.data().hours
                        });
                    }
                    else {
                        dispatch({type: "SET_DAY_TO_NULL"});
                    }

                })
                .catch(console.error);

            // select day
            selectDay(target);

        }
    };

    const handleNextClick = () => {
        if (date.getMonth() < (new Date()).getMonth() + 3) {

            const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            setDate(newDate);
            
            selectDay(null);
        }
    };

    const handlePrevClick = () => {
        if (date.getMonth() > (new Date()).getMonth()) {

            const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            setDate(newDate);

            selectDay(null);
        }
    };

    return (
        <table onClick={handleClick} className="calendar">

            <thead>
                <tr className="calendar__header">
                    <th className="calendar__nav-arrow" onClick={handlePrevClick}>{"<<"}</th>
                    <MonthName month={date.getMonth()} />
                    <th className="calendar__nav-arrow" onClick={handleNextClick}>{">>"}</th>
                </tr>
                <tr>
                    <Weekdays />
                </tr>
            </thead>

            <tbody>
                <Weeks days={getDays(date)} />
            </tbody>

        </table>
    );

};

export default Calendar;