import React from "react";

const Hours = (props) => {

    const startHour = 13;
    const endHour = 19;

    const isHourBooked = ( () => {
        if(props.day !== null) {
            return (hour) => {
                        if(props.day.appointmentHours.find(item => item.hour === hour)) {
                            return "time__item time__item_booked";
                        } else {
                            return "time__item";
                        }
                    };
        } else {
            return () => "time__item";
        }
    })()

    let hours = [];

    for (let i = startHour; i < endHour; i++) {
        hours.push(
            <li 
                key={`${props.date.getMonth()}-${props.date.getDate()}-${i}`} 
                className={isHourBooked(i)}
                onClick={() => props.onClick(i)}
            >
                {`${i}:00 - ${i + 1}:00`}
            </li>
        );
    }

    return hours;
}

export default Hours;