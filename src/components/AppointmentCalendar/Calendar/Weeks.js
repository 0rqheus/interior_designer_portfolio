import React from "react";

const Weeks = (props) => {
    const weeks = [];
    for (let i = 0; i < 5; i++) {
        weeks.push(
            <tr key={"week" + i}>
                {props.days.slice(i * 7, (i * 7) + 7)}
            </tr>
        );
    }

    return weeks;
};

export default Weeks;