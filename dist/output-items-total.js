"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    userCache.parseRangePrice(data, rangePrice);
    const filters_ = {};
    const subFilters_ = {};
    userCache.prepareUserCacheFilter(category.filters, filters_);
    userCache.prepareUserCacheSubfilter(category.subFilters, subFilters_);
    const count = applyLogic.applyForTotal(applied, selected, category.subFilters, rangePrice);
    const json = JSON.stringify({ "total": String(count) });
    return {
        itemsTotal: json
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-items-total.js.map