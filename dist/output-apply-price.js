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
    const rangePrice = new model_range_price_1.RangePrice();
    userCache.parseRangePrice(data, rangePrice);
    const filters_ = {};
    const subFilters_ = {};
    userCache.prepareUserCacheFilter(category.filters, filters_);
    userCache.prepareUserCacheSubfilter(category.subFilters, subFilters_); // ????
    applyLogic.applyByPrice(rangePrice, filters_, category.subFilters);
    const result = applyLogic.getEnabledFiltersIds(filters_);
    const json = converter.arrToJson(result);
    return {
        filterIds: json
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-apply-price.js.map