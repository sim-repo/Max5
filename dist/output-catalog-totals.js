"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const converter = __importStar(require("./converter"));
const m = __importStar(require("./index"));
exports.prefetchLimit = 100;
function getResults(data) {
    const categoryId = data.categoryId;
    const category = m.cacheByCategory[categoryId];
    const itemIds = [];
    for (const item of category.items) {
        itemIds.push(item.id);
    }
    const json1 = converter.arrToJson(itemIds);
    const json2 = JSON.stringify({ "fetchLimit": String(exports.prefetchLimit) });
    let json3 = "";
    let json4 = "";
    const rangePrice = category.rangePrice;
    if (rangePrice != null) {
        json3 = JSON.stringify({ "minPrice": String(rangePrice.userMinPrice) });
        json4 = JSON.stringify({ "maxPrice": String(rangePrice.userMaxPrice) });
    }
    return {
        itemIds: json1,
        fetchLimit: json2,
        minPrice: json3,
        maxPrice: json4
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-catalog-totals.js.map