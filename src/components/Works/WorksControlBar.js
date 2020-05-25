import React from "react";

import "./worksControlBar.scss";

const WorksControlBar = (props) => {

    return (
        <div className="works-control-bar">
            <div className="works-control-bar__selects-container">
                <select className="works-control-bar__select sort-select" onChange={props.handleSort} defaultValue={props.sort}>
                    <option value="recent">Recent</option>
                    <option value="priceUp">Price up</option>
                    <option value="priceDown">Price down</option>
                </select>
                <select className="works-control-bar__select filter-select" onChange={props.handleFilter} defaultValue={props.filter}>
                    <option value="all">All</option>
                    <option value="eco">Eco</option>
                    <option value="mix">Mix</option>
                    <option value="minimalism">Minimalism</option>
                    <option value="neoclassic">Neoclassic</option>
                </select>
            </div>
            <div className="works-control-bar__search-container">
                <input className="works-control-bar__search-input" onChange={props.handleSearchInput} defaultValue={props.search}/>
                <button className="works-control-bar__search-btn" onClick={props.handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default WorksControlBar;