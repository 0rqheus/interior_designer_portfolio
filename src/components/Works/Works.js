import React from "react";
import { db } from "../../firebase";

import "./works.scss";

import PaginationMenu from "./PaginationMenu";
import WorksList from "./WorkList";
import WorksControlBar from "./WorksControlBar";
import Loader from "../_partials/Loader/Loader";

export default class Works extends React.Component {

    constructor(props) {
        super(props);

        this.uploadData();

        this.state = {
            data: null,
            sort: "recent",
            filter: "all",
            currentPage: 1,
            pageAmount: 1,
            firstDoc: null,
            lastDoc: null
        };
    }

    setFilterQuery = (filter, collection) => {
        console.log(filter);

        return filter !== "all" 
        ? collection.where("style", "==", filter) 
        : collection;
    }

    setSortQuery = (sort, collection) => {

        console.log(sort);

        if(sort === "recent") {
            return collection.orderBy("createdDate", "desc");

        } else if(sort === "priceUp") {
            return collection.orderBy("price");

        } else if(sort === "priceDown") {
            return collection.orderBy("price", "desc");

        } else {
            return collection;
        }
    }

    setPaginationQuery = (pageType, pageSize, collection) => {

        if (pageType === "next") {
            return collection.startAfter(this.state.lastDoc).limit(pageSize);

        } else if (pageType === "prev") {
            return collection.endBefore(this.state.firstDoc).limitToLast(pageSize)

        } else {
            return collection.limit(pageSize);
        }
    }

    uploadData = (params = {filter: "all", sort: "recent", pageType: ""}) => {

        const pageSize = 6;
        const collection = db.collection("works");
        
        let query =  this.setFilterQuery(params.filter, collection);
        query = this.setSortQuery(params.sort, query);
        
        query.get()
            .then(querySnapshot => {
                this.setState({
                    pageAmount: Math.ceil(querySnapshot.size / pageSize)
                });

                this.setPaginationQuery(params.pageType, pageSize, query).get()
                    .then(querySnapshot => {
                        let data = [];
                
                        querySnapshot.forEach((doc) => {
                            data.push({id: doc.id, ...doc.data()});
                        });

                        this.setState({
                            data: data,
                            firstDoc: querySnapshot.docs[0],
                            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
                        });

                        console.log(data);
                    })
                    .catch(console.error);
            })
            .catch(console.error);

    }


    handleSort = (event) => {
        const select = event.target.value;

        this.setState({
            sort: select
        });

        this.uploadData({
            ...this.state,
            sort: select
        });

    }

    handleFilter = (event) => {
        const select = event.target.value;

        this.setState({
            filter: select
        });
        
        this.uploadData({
            ...this.state,
            filter: select
        });
    }

    // @todo
    handleSearch = () => {

    }

    handlePrevPage = () => {
        if(this.state.currentPage !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })

            this.uploadData({
                ...this.state,
                pageType: "prev"
            })
        }
    }

    handleNextPage = () => {
        if(this.state.currentPage < this.state.pageAmount) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })

            this.uploadData({
                ...this.state,
                pageType: "next"
            })
        }
    }
    
    render() {
        if(this.state.data === null) return <Loader width="95vw" height="95vh"/>

        if(this.state.data.length !== 0) 
        {
            return (<div className="works">
                <WorksControlBar 
                    handleSort={this.handleSort} 
                    handleFilter={this.handleFilter} 
                    handleSearch={this.handleSearch}
                />
                <WorksList data={this.state.data}/>
                <PaginationMenu 
                    onPrev={this.handlePrevPage} 
                    onNext={this.handleNextPage} 
                    currentPage={this.state.currentPage} 
                    pageAmount={this.state.pageAmount}
                />
            </div>);
        } else {
            return <h3>No results</h3>;
        }
    }
}