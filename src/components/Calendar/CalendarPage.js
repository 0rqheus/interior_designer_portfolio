import React from "react";

import Time from "./Time";
import Calendar from "./Calendar";
import Modal from "../_partials/Modal/Modal";
import AppointmentModalContent from "./AppointmentModalContent";
import { APPOINTMENT_MODAL } from "../../modalNames";

import "./calendarPage.scss";

const CalendarPage = () => {

    return (
        <div className="calendar-page" >
            <Modal modalId={APPOINTMENT_MODAL} content={AppointmentModalContent} />
            <Time/>
            <Calendar/>
        </div>
    );
};

export default CalendarPage;