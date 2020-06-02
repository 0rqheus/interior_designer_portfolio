import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { APPOINTMENT_MODAL } from "../../modalNames";

import Hours from "./Hours";

import "./time.scss";

const Time = () => {
    const date = useSelector(state => state.chosenDate);
    const day = useSelector(state => state.chosenDay);
    const dispatch = useDispatch();

    const handleClick = (event) => {

        const target = event.target;

        if (!target.classList.contains("time__item_booked")) {
            const hour = target.dataset.hour;
            const chosenDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +hour);

            dispatch({
                type: "SET_CHOSEN_DATE",
                chosenDate: chosenDate
            });

            dispatch({
                type: "TOGGLE_MODAL",
                modalName: APPOINTMENT_MODAL
            });
        }

    };

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    return (
        <div className="time">

            <h4 className="time__title">Time</h4>

            {
                date !== null &&

                <div>
                    <p className="time__date">
                        {date.toLocaleDateString("en-GB", options)}
                    </p>
                    <ul className="time__list" onClick={handleClick} >
                        <Hours day={day} date={date} />
                    </ul>
                </div>
            }

        </div>
    );

};

export default Time;