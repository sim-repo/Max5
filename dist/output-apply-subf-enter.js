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
const applyLogic = __importStar(require("./main-applying-logic"));
const userCache = __importStar(require("./user-cache"));
const model_range_price_1 = require("./model-range-price");
const m = __importStar(require("./index"));
function getResults(data) {
    const categoryId = data.categoryId;
    const category = m.cacheByCategory[categoryId];
    const applied = new Set();
    const arr = data.appliedSubFilters;
    applyLogic.setAppliedSubFilters(arr, applied);
    const filterId = data.filterId;
    const rangePrice = new model_range_price_1.RangePrice();
    userCache.parseRangePrice(data, rangePrice);
    const filters_ = {};
    const subFilters_ = {};
    const countItemsBySubfilter_ = {};
    userCache.prepareUserCacheFilter(category.filters, filters_);
    userCache.prepareUserCacheSubfilter(category.subFilters, subFilters_);
    applyLogic.applyBeforeEnter(applied, filterId, filters_, category.subFilters, subFilters_, countItemsBySubfilter_, rangePrice);
    const subFiltersIds = applyLogic.getEnabledSubFiltersIds(subFilters_);
    const json1 = JSON.stringify({ "filterId": String(filterId) });
    const json2 = converter.arrToJson(subFiltersIds);
    const json3 = converter.arrToJson(Array.from(applied));
    const json4 = converter.dictionaryToJson(countItemsBySubfilter_);
    return {
        filterId: json1,
        subFiltersIds: json2,
        appliedSubFiltersIds: json3,
        countItemsBySubfilter: json4
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-apply-subf-enter.js.map