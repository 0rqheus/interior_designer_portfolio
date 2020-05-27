import React from "react";
import { client } from "../../algolia";

import "./works.scss";

import PaginationMenu from "./PaginationMenu";
import WorksList from "./WorksList";
import WorksControlBar from "./WorksControlBar";
import Loader from "../_partials/Loader/Loader";

export default class Works extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,

            search: "",
            sort: "date_desc",
            filter: "all",

            currentPage: 1,
            pageAmount: 1
        };

        this.uploadData();
    }


    uploadData = (query = { search: "", filter: "all", sort: "date_desc", currentPage: 1 }) => {

        const indexName = "myWorks";
        const index = client.initIndex(`${indexName}_${query.sort}`);

        const pageSize = 6;
        const filter = query.filter;

        const params = {
            page: query.currentPage - 1,
            hitsPerPage: pageSize
        };

        if (filter !== "all")
            params.filters = `style:${filter}`;

            
        index.search(query.search, params)
            .then(results => {
                this.setState({
                    data: results.hits,
                    pageAmount: results.nbPages
                });
            })
            .catch(console.error);

    }

    handleSort = (event) => {
        const sort = event.target.value;

        this.setState({
            sort: sort
        });

        this.uploadData({
            ...this.state,
            sort: sort
        });

    }

    handleFilter = (event) => {
        const filter = event.target.value;

        this.setState({
            filter: filter
        });

        this.uploadData({
            ...this.state,
            filter: filter
        });
    }

    handleSearch = (event) => {
        const search = event.target.value;

        this.setState({
            search: search
        });

        this.uploadData({
            ...this.state,
            search: search
        });
    }

    handlePagination = (event) => {
        const pageType = event.target.dataset.pageType;
        const currentPage = this.state.currentPage;
        const pageAmount = this.state.pageAmount;

        console.log(pageType, currentPage, pageAmount);

        if (pageType === "next" && currentPage < pageAmount) {

            const targetPage = currentPage + 1;

            this.setState({ currentPage: targetPage });

            this.uploadData({
                ...this.state,
                currentPage: targetPage
            });

        } else if (pageType === "previous" && currentPage !== 1) {

            const targetPage = currentPage - 1;

            this.setState({ currentPage: targetPage });

            this.uploadData({
                ...this.state,
                currentPage: targetPage
            });
        }
    }

    render() {

        if (this.state.data === null)
            return <Loader width="95vw" height="95vh" />;

        return (<div className="works">
            <WorksControlBar
                handleSort={this.handleSort}
                handleFilter={this.handleFilter}
                handleSearch={this.handleSearch}
                search={this.state.search}
                filter={this.state.filter}
                sort={this.state.sort}
            />

            {this.state.data.length !== 0
                ? (
                    <>
                        <WorksList data={this.state.data} />
                        <PaginationMenu
                            handlePagination={this.handlePagination}
                            currentPage={this.state.currentPage}
                            pageAmount={this.state.pageAmount}
                        />
                    </>
                )
                : (<h3 className="works__no-results">No results</h3>)
            }
        </div>);

    }
}