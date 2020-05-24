import React from "react";

import Time from "./Time";
import Calendar from "./Calendar";
import "./calendarPage.scss";

const CalendarPage = () => {

    return (
        <div className="calendar-page" >
            <Time/>
            <Calendar/>
        </div>
    );
};

export default CalendarPage;