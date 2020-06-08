import React from "react";

import "./worksControlBar.scss";

const WorksControlBar = (props) => {

    const { queryParams } = props;

    return (
        <div className="works-control-bar">
            <div className="works-control-bar__selects-container">
                <select className="works-control-bar__select sort-select" onChange={props.handleSort} defaultValue={queryParams.sort}>
                    <option value="date_desc">Recent</option>
                    <option value="price_asc">Price up</option>
                    <option value="price_desc">Price down</option>
                </select>
                <select className="works-control-bar__select filter-select" onChange={props.handleFilter} defaultValue={queryParams.filter}>
                    <option value="all">All</option>
                    <option value="eco">Eco</option>
                    <option value="mix">Mix</option>
                    <option value="minimalism">Minimalism</option>
                    <option value="neoclassic">Neoclassic</option>
                </select>
            </div>
            <input className="works-control-bar__search-input" onChange={props.handleSearch} defaultValue={queryParams.search}/>
        </div>
    );
};

export default WorksControlBar;