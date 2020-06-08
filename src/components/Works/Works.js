import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

import "./works.scss";

import PaginationMenu from "./PaginationMenu";
import WorksList from "./WorksList";
import WorksControlBar from "./WorksControlBar";
import Loader from "../_partials/Loader/Loader";

const Works = () => {

    const [data, setData] = useState(null);

    const [queryParams, setQueryParams] = useState({
        search: "",
        sort: "date_desc",
        filter: "all"
    });

    const [paginationParams, setPaginationParams] = useState({
        firstDoc: null,
        lastDoc: null,
        currentPage: 1,
        pageAmount: 1
    });

    // query helpers
    const configureSearchQuery = (search, collection) => {
        if (search !== "") {
            // trigger loader
            setData(null);

            return collection.where("keywords", "array-contains", search.toLowerCase());
        }

        return collection;
    };

    const configureFilterQuery = (filter, collection) => {
        return filter !== "all"
            ? collection.where("style", "==", filter)
            : collection;
    };

    const configureSortQuery = (sort, collection) => {
        if (sort === "date_desc") {
            return collection.orderBy("createdDate", "desc");

        } else if (sort === "price_asc") {
            return collection.orderBy("price");

        } else if (sort === "price_desc") {
            return collection.orderBy("price", "desc");

        } else {
            return collection;
        }
    };

    const configurePaginationQuery = (pageType, pageSize, collection) => {

        if (pageType === "next") {
            return collection.startAfter(paginationParams.lastDoc).limit(pageSize);

        } else if (pageType === "previous") {
            return collection.endBefore(paginationParams.firstDoc).limitToLast(pageSize);

        } else {
            return collection.limit(pageSize);
        }
    };

    // upload data
    const uploadDataForPage = (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });

        setData(docs);

        setPaginationParams({
            ...paginationParams,
            firstDoc: querySnapshot.docs[0],
            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        });
    };

    const uploadData = (params = { search: "", filter: "all", sort: "date_desc", pageType: "" }) => {
        const pageSize = 6;
        const collection = db.collection("works");

        let query = configureSearchQuery(params.search, collection);
        query = configureFilterQuery(params.filter, query);
        query = configureSortQuery(params.sort, query);

        query.get()
            //  get all results to set page amount
            .then(querySnapshot => {

                setPaginationParams({
                    ...paginationParams,
                    pageAmount: Math.ceil(querySnapshot.size / pageSize)
                });

                // get data for specific page
                configurePaginationQuery(params.pageType, pageSize, query).get()
                    .then(uploadDataForPage)
                    .catch(console.error);
            })
            .catch(console.error);
    };

    // handlers
    const handleSearch = (event) => {
        const search = event.target.value;

        const newParams = {
            ...queryParams,
            search: search
        };

        setQueryParams(newParams);
        uploadData(newParams);
    };

    const handleSort = (event) => {
        const sort = event.target.value;

        const newParams = {
            ...queryParams,
            sort: sort
        };

        setQueryParams(newParams);
        uploadData(newParams);

    };

    const handleFilter = (event) => {
        const filter = event.target.value;

        const newParams = {
            ...queryParams,
            filter: filter
        };

        setQueryParams(newParams);
        uploadData(newParams);
    };

    const handlePagination = (event) => {
        const pageType = event.target.dataset.pageType;
        const currentPage = paginationParams.currentPage;

        const targetPage = pageType === "next"
            ? currentPage + 1
            : currentPage - 1;

        setPaginationParams({
            ...paginationParams,
            currentPage: targetPage
        });

        uploadData({
            ...queryParams,
            pageType: pageType
        });
    };

    useEffect(uploadData, []);

    // component parts 
    const Results = () => (
        <>
            <WorksList data={data} />
            <PaginationMenu
                handlePagination={handlePagination}
                currentPage={paginationParams.currentPage}
                pageAmount={paginationParams.pageAmount}
            />
        </>
    );

    const NoResults = () => <h3 className="works__no-results">No results</h3>;

    const Content = () => (
        <>
            <WorksControlBar
                handleSort={handleSort}
                handleFilter={handleFilter}
                handleSearch={handleSearch}
                queryParams={queryParams}
            />
            {
                data.length !== 0
                    ? <Results />
                    : <NoResults />
            }
        </>
    );


    return (
        <div className="works">
            {
                data === null
                    ? <Loader width="95vw" height="72vh" />
                    : <Content/>
            }
        </div>
    );
};

export default Works;