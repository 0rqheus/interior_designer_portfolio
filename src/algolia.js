import algoliasearch from "algoliasearch";

const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const searchKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;

export const client = algoliasearch(appId, searchKey);