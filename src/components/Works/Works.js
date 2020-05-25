import React from "react";
import { db } from "../../firebase";
import algoliasearch from "algoliasearch";

import "./works.scss";

import PaginationMenu from "./PaginationMenu";
import WorksList from "./WorkList";
import WorksControlBar from "./WorksControlBar";
import Loader from "../_partials/Loader/Loader";

export default class Works extends React.Component {

    constructor(props) {
        super(props);

        const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);
        this.index = client.initIndex("works");

        this.uploadData();

        this.state = {
            data: null,

            search: "",
            sort: "recent",
            filter: "all",

            currentPage: 1,
            pageAmount: 1,
            firstDoc: null,
            lastDoc: null,

            isLoading: false
        };
    }
    

    setSearchQuery = async (search, collection) => {
        console.log("Search: " + search);

        if(search !== "") {

            // trigger loader
            this.setState({data: null});

            try {
                // get all matched data from algolia
                const results = await this.index.search(search);
                const matchedTitles = results.hits.map(item => item.title);

                return collection.where("title", "in", matchedTitles);
    
            } catch(err) {
                console.error(err);
            }
        }

        return collection;
    }

    setFilterQuery = (filter, collection) => {
        // console.log("Filter: " + filter);

        return filter !== "all"
            ? collection.where("style", "==", filter)
            : collection;
    }

    setSortQuery = (sort, collection) => {

        // console.log("Sort:" + sort);

        if (sort === "recent") {
            return collection.orderBy("createdDate", "desc");

        } else if (sort === "priceUp") {
            return collection.orderBy("price");

        } else if (sort === "priceDown") {
            return collection.orderBy("price", "desc");

        } else {
            return collection;
        }
    }

    setPaginationQuery = (pageType, pageSize, collection) => {

        if (pageType === "next") {
            return collection.startAfter(this.state.lastDoc).limit(pageSize);

        } else if (pageType === "prev") {
            return collection.endBefore(this.state.firstDoc).limitToLast(pageSize);

        } else {
            return collection.limit(pageSize);
        }
    }

    uploadDataForPage = (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        this.setState({
            data: data,
            firstDoc: querySnapshot.docs[0],
            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        });

        console.log(data);
    }

    uploadData = async(params = { search: "", filter: "all", sort: "recent", pageType: "" }) => {
        console.clear();
        const pageSize = 6;
        const collection = db.collection("works");

        let query = await this.setSearchQuery(params.search, collection);
        query = this.setFilterQuery(params.filter, query);
        query = this.setSortQuery(params.sort, query);

        query.get()
            //  get all results to set page amount
            .then(querySnapshot => {
                this.setState({
                    pageAmount: Math.ceil(querySnapshot.size / pageSize)
                });

                // get data for specific page
                this.setPaginationQuery(params.pageType, pageSize, query).get()
                    .then(querySnapshot => this.uploadDataForPage(querySnapshot))
                    .catch(console.error);
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

        // this.index.search(search)
        //     .then((results) => {

        //         const data = results.hits.map(item => {
        //             return {
        //                 ...item,
        //                 id: item.objectID
        //             };
        //         });

        //         this.setState({
        //             data: data
        //         });
        //     })
        //     .catch(console.error);
    }

    handlePrevPage = () => {
        if (this.state.currentPage !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });

            this.uploadData({
                ...this.state,
                pageType: "prev"
            });
        }
    }

    handleNextPage = () => {
        if (this.state.currentPage < this.state.pageAmount) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });

            this.uploadData({
                ...this.state,
                pageType: "next"
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
                ? (<>
                    <WorksList data={this.state.data} />
                    <PaginationMenu
                        onPrev={this.handlePrevPage}
                        onNext={this.handleNextPage}
                        currentPage={this.state.currentPage}
                        pageAmount={this.state.pageAmount}
                    />
                </>)

                : (<h3>No results</h3>)
            }
        </div>);

    }
}