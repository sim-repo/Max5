"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const m = __importStar(require("./index"));
function getResults(data) {
    const categoryId = data.categoryId;
    const category = m.cacheByCategory[categoryId];
    const json1 = category.filtersJSON;
    const json2 = category.subFiltersJSON;
    return {
        filters: json1,
        subFilters: json2
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-chunk5.js.map