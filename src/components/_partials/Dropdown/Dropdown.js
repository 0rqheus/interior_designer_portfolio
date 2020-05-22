import React from "react";
import "./dropdown.scss";

const Dropdown = (props) => {
    return (
        <div className="dropdown">
            <props.target/>
            
            <div className="dropdown__content">
              <props.content/>
            </div>
        </div>
    )
}

export default Dropdown;