"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper = __importStar(require("./helper"));
const applyLogic = __importStar(require("./main-applying-logic"));
function parseDataApplying(data, appliedSubFilters_, selectedSubFilters_) {
    const applied = data.appliedSubFilters;
    const selected = data.selectedSubFilters;
    if (helper.stringIsNullOrEmpty(applied) === false) {
        const str = applied.toString();
        const arr = str.split(",");
        applyLogic.setAppliedSubFilters(arr, appliedSubFilters_);
    }
    if (helper.stringIsNullOrEmpty(selected) === false) {
        const str = selected.toString();
        const arr = str.split(",");
        applyLogic.setSelectedSubFilters(arr, selectedSubFilters_);
    }
}
exports.parseDataApplying = parseDataApplying;
function parseRangePrice(data, rangePrice) {
    const sUserMinPrice = data.userMinPrice;
    let userMinPrice = 0;
    if (helper.stringIsNullOrEmpty(sUserMinPrice) === false) {
        userMinPrice = helper.toNumber(sUserMinPrice);
    }
    const sUserMaxPrice = data.userMaxPrice;
    let userMaxPrice = 0;
    if (helper.stringIsNullOrEmpty(sUserMaxPrice) === false) {
        userMaxPrice = helper.toNumber(sUserMaxPrice);
    }
    rangePrice.userMinPrice = userMinPrice;
    rangePrice.userMaxPrice = userMaxPrice;
    rangePrice.tipMinPrice = 50000000;
    rangePrice.tipMaxPrice = -1;
    rangePrice.categoryId = data.categoryId;
}
exports.parseRangePrice = parseRangePrice;
function parseRangePriceWhenMaybeReset(data, rangePrice) {
    parseRangePrice(data, rangePrice);
    const sInitialMinPrice = data.initialMinPrice;
    let initialMinPrice = 0;
    if (helper.stringIsNullOrEmpty(sInitialMinPrice) === false) {
        initialMinPrice = helper.toNumber(sInitialMinPrice);
    }
    const sInitialMaxPrice = data.initialMaxPrice;
    let initialMaxPrice = 0;
    if (helper.stringIsNullOrEmpty(sInitialMaxPrice) === false) {
        initialMaxPrice = helper.toNumber(sInitialMaxPrice);
    }
    rangePrice.initialMinPrice = initialMinPrice;
    rangePrice.initialMaxPrice = initialMaxPrice;
}
exports.parseRangePriceWhenMaybeReset = parseRangePriceWhenMaybeReset;
function useGlobalCache(data) {
    const useCache = data.useCache;
    if (useCache != null) {
        return useCache;
    }
    return false;
}
exports.useGlobalCache = useGlobalCache;
function prepareUserCacheFilter(from, to) {
    for (const key in from) {
        to[key] = true;
    }
}
exports.prepareUserCacheFilter = prepareUserCacheFilter;
function prepareUserCacheSubfilter(from, to) {
    for (const key in from) {
        to[key] = true;
    }
}
exports.prepareUserCacheSubfilter = prepareUserCacheSubfilter;
//# sourceMappingURL=user-cache.js.map