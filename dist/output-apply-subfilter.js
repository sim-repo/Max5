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
    const selected = new Set();
    userCache.parseDataApplying(data, applied, selected);
    const rangePrice = new model_range_price_1.RangePrice();
    userCache.parseRangePriceWhenMaybeReset(data, rangePrice);
    const filterId = data.filterId;
    const filters_ = {};
    const subFilters_ = {};
    userCache.prepareUserCacheFilter(category.filters, filters_);
    userCache.prepareUserCacheSubfilter(category.subFilters, subFilters_);
    applyLogic.applyFromSubFilter(filterId, applied, selected, filters_, category.subFilters, subFilters_, rangePrice);
    const result1 = applyLogic.getEnabledFiltersIds(filters_);
    const json1 = converter.arrToJson(result1);
    const result2 = applyLogic.getEnabledSubFiltersIds(subFilters_);
    const json2 = converter.arrToJson(result2);
    const result3 = applied;
    const json3 = converter.arrToJson(Array.from(result3));
    const result4 = selected;
    const json4 = converter.arrToJson(Array.from(result4));
    const json5 = JSON.stringify({ "tipMinPrice": String(rangePrice.tipMinPrice) });
    const json6 = JSON.stringify({ "tipMaxPrice": String(rangePrice.tipMaxPrice) });
    const json7 = JSON.stringify({ "total": String(rangePrice.itemsTotal) });
    return {
        filtersIds: json1,
        subFiltersIds: json2,
        appliedSubFiltersIds: json3,
        selectedSubFiltersIds: json4,
        tipMinPrice: json5,
        tipMaxPrice: json6,
        itemsTotal: json7
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-apply-subfilter.js.map