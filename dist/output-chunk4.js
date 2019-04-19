"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_cross_filters_1 = require("./cache-cross-filters");
function getResults(data) {
    const filterId = data.filterId;
    const cacheCross = cache_cross_filters_1.CacheCrossFilters.getInstance();
    const filterJSON = cacheCross.filterJSON[filterId];
    const subfiltersJSON = cacheCross.subFiltersJSON[filterId];
    const subfiltersByFilterJSON = cacheCross.subfiltersByFilterJSON[filterId];
    return {
        filter: filterJSON,
        subFilters: subfiltersJSON,
        subfiltersByFilter: subfiltersByFilterJSON
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-chunk4.js.map