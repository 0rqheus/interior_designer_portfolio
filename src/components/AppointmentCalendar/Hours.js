import React from "react";

const Hours = (props) => {

    const startHour = 13;
    const endHour = 19;
    const { day, date } = props;

    const isHourBooked = (() => {

        if (day !== null) {
            return (hour) => {
                if (day.appointmentHours.find(item => item.hour === hour)) {
                    return "time__item time__item_booked";
                } else {
                    return "time__item";
                }
            };
        } 
        else {
            return () => "time__item";
        }
    })();

    const hours = [];

    for (let i = startHour; i < endHour; i++) {
        hours.push(
            <li
                key={`${date.getMonth()}-${date.getDate()}-${i}`}
                className={isHourBooked(i)}
                data-hour={i}
            >
                {`${i}:00 - ${i + 1}:00`}
            </li>
        );
    }

    return hours;
};

export default Hours;