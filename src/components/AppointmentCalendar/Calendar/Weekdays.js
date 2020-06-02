import React from "react";

const Weekdays = () => {
    const weekdaysData = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mobileWeekdaysData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return weekdaysData.map((el, index) => {
        return (
            <th key={"weekday" + index} className="calendar__weekday">
                <span className="calendar__weekday-value">{el}</span>
                <span className="calendar__weekday-value_mobile">{mobileWeekdaysData[index]}</span>
            </th>
        );
    });
};

export default Weekdays;