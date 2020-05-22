import React from "react";

const WorksControlBar = (props) => {
    return (
        <div className="works-control-bar">
            <select className="works-control-bar__select sort-select" onChange={props.handleSort}>
                <option value="recent">Recent</option>
                <option value="priceUp">Price up</option>
                <option value="priceDown">Price down</option>
            </select>
            <select className="works-control-bar__select filter-select" onChange={props.handleFilter}>
                <option value="all">All</option>
                <option value="eco">Eco</option>
                <option value="mix">Mix</option>
                <option value="minimalism">Minimalism</option>
                <option value="neoclassic">Neoclassic</option>
            </select>
            <input className="works-control-bar__search-input" onChange={props.handleSearch} />
        </div>
    )
}

export default WorksControlBar;