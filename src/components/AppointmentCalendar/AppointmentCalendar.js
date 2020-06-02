import React from "react";

import Time from "./Time";
import Calendar from "./Calendar/Calendar";
import Modal from "../_partials/Modal/Modal";
import AppointmentModalContent from "./AppointmentModalContent";
import { APPOINTMENT_MODAL } from "../../modalNames";

import "./appointmentCalendar.scss";

const AppointmentCalendar = () => {

    return (
        <div className="appointment-calendar" >
            <Modal modalId={APPOINTMENT_MODAL} content={AppointmentModalContent} />
            <Time/>
            <Calendar/>
        </div>
    );
};

export default AppointmentCalendar;