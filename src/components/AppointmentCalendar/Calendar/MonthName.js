import React from "react";

const MonthName = (props) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <th className="calendar__month" colSpan="5">
            {months[props.month]}
        </th>
    );
};

export default MonthName;