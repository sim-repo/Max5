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
exports.priceByItem = {};
exports.itemsBySubfilter = {};
exports.subfiltersByItem = {};
exports.subfiltersByFilter = {};
function getEnabledFiltersIds(enabledFilters_) {
    const res = [];
    for (const key in enabledFilters_) {
        if (enabledFilters_[key]) {
            res[key] = Number(key);
        }
    }
    return res.sort((n1, n2) => n1 - n2);
}
exports.getEnabledFiltersIds = getEnabledFiltersIds;
function getEnabledSubFiltersIds(enabledSubfilters_) {
    const res = [];
    for (const key in enabledSubfilters_) {
        if (enabledSubfilters_[key]) {
            res[key] = Number(key);
        }
    }
    return res.sort((n1, n2) => n1 - n2);
}
exports.getEnabledSubFiltersIds = getEnabledSubFiltersIds;
function limitRangePrice(itemId, rangePrice) {
    if (exports.priceByItem[itemId] != null) {
        const price = exports.priceByItem[itemId];
        if (rangePrice.tipMinPrice > price) {
            rangePrice.tipMinPrice = price;
        }
        if (rangePrice.tipMaxPrice < price) {
            rangePrice.tipMaxPrice = price;
        }
    }
}
function checkPrice(itemId, minPrice, maxPrice) {
    if (exports.priceByItem[itemId] != null) {
        const price = exports.priceByItem[itemId];
        if (price >= minPrice && price <= maxPrice) {
            return true;
        }
    }
    return false;
}
function getItemIds(bySubFilterIds, rangePrice) {
    const arr = [];
    for (const key in bySubFilterIds) {
        const id = bySubFilterIds[key];
        if (exports.itemsBySubfilter[id] != null) {
            const itemIds = exports.itemsBySubfilter[id];
            for (const itemId of itemIds) {
                if (rangePrice.userMinPrice > 0 || rangePrice.userMaxPrice > 0) {
                    if (checkPrice(itemId, rangePrice.userMinPrice, rangePrice.userMaxPrice)) {
                        arr.push(itemId);
                    }
                }
                else {
                    arr.push(itemId);
                }
                limitRangePrice(itemId, rangePrice);
            }
        }
    }
    const set = new Set(arr);
    return set;
}
function getItemsIntersect(applyingByFilter, exceptFilterId, rangePrice) {
    let res = new Set();
    let tmp = new Set();
    for (const key in applyingByFilter) {
        if ((Number(key) != exceptFilterId) || (exceptFilterId == 0)) {
            const val = applyingByFilter[key];
            tmp = getItemIds(val, rangePrice);
        }
        res = (res.size == 0) ? tmp : new Set([...res].filter(x => tmp.has(x)));
    }
    return res;
}
exports.getItemsIntersect = getItemsIntersect;
function getItemsByPrice(rangePrice) {
    let res = new Set();
    // TODO: добавить дополнительную фильтрацию по RangePrice.categoryID!!!!
    for (const id in exports.priceByItem) {
        const price = exports.priceByItem[id];
        if (price >= rangePrice.userMinPrice && price <= rangePrice.userMaxPrice) {
            const i = parseInt(id);
            res.add(i);
        }
    }
    return res;
}
exports.getItemsByPrice = getItemsByPrice;
function groupApplying(applyingByFilter, applying, subFilters_) {
    for (const id of applying) {
        if (subFilters_[id] !== null) {
            const subFilterModel = subFilters_[id];
            const filterId = subFilterModel.filterId;
            if (applyingByFilter[filterId] == null) {
                applyingByFilter[filterId] = [];
            }
            applyingByFilter[filterId].push(id);
        }
    }
}
exports.groupApplying = groupApplying;
function getSubFilters(items, countItemsBySubfilter_ = null) {
    const arr = [];
    for (const key of items) {
        const tmp = exports.subfiltersByItem[key];
        for (const i of tmp) {
            arr.push(i);
        }
    }
    if (countItemsBySubfilter_ != null) {
        arr.forEach(id => {
            if (countItemsBySubfilter_[id] == null) {
                countItemsBySubfilter_[id] = 1;
            }
            else {
                countItemsBySubfilter_[id] += 1;
            }
        });
    }
    return new Set(arr);
}
function fillItemsCount(byfilterId, countItemsBySubfilter_) {
    const subfilters = exports.subfiltersByFilter[byfilterId];
    for (const subfID of subfilters) {
        const tmp = exports.itemsBySubfilter[subfID];
        if (tmp != null) {
            countItemsBySubfilter_[subfID] = tmp.length;
        }
    }
}
function enableAllFilters(enabledFilters_, exceptFilterId = 0, enable) {
    for (const id in enabledFilters_) {
        enabledFilters_[id] = enable;
    }
    if (exceptFilterId != 0) {
        enabledFilters_[exceptFilterId] = true;
    }
}
function enableAllSubFilters(filterId = 0, subFilters_, enabledSubfilters_, enable) {
    for (const id in subFilters_) {
        const val = subFilters_[id];
        if (val.filterId != filterId || filterId == 0) {
            enabledSubfilters_[id] = enable;
        }
    }
}
function enableAllSubFilters2(filterId = 0, subFilters_, enabledSubfilters_, enable) {
    for (const id in subFilters_) {
        const val = subFilters_[id];
        if (val.filterId !== filterId || filterId === 0) {
            enabledSubfilters_[id] = enable;
        }
    }
    if (filterId === 0) {
        return;
    }
    for (const id in subFilters_) {
        const val = subFilters_[id];
        if (val.filterId === filterId) {
            enabledSubfilters_[id] = !enable;
        }
    }
}
function disableSubFilters(filterId, subFilters_, enabledSubfilters_) {
    for (const id in subFilters_) {
        const val = subFilters_[id];
        if (val.filterId == filterId) {
            enabledSubfilters_[id] = false;
        }
    }
}
function enableFilters(filterId, enabledFilters_) {
    enabledFilters_[filterId] = true;
}
function getApplied(appliedSubFilters_, subFilters_, exceptFilterId = 0) {
    const arr = [];
    if (appliedSubFilters_.size == 0) {
        return new Set();
    }
    if (exceptFilterId == 0) {
        return new Set(appliedSubFilters_);
    }
    for (const id of appliedSubFilters_) {
        if (subFilters_[Number(id)].filterId != exceptFilterId) {
            arr.push(Number(id));
        }
    }
    return new Set(arr);
}
function resetFilters(appliedSubFilters_, selectedSubFilters_ = null, filters_, subFilters_, enabledSubfilters_, exceptFilterId = 0, rangePrice = null) {
    if (selectedSubFilters_ != null) {
        selectedSubFilters_.clear();
    }
    appliedSubFilters_.clear();
    enableAllFilters(filters_, 0, true);
    enableAllSubFilters(exceptFilterId, subFilters_, enabledSubfilters_, true);
    resetRangePrice(rangePrice);
}
exports.resetFilters = resetFilters;
function resetRangePrice(rangePrice = null) {
    if (rangePrice != null) {
        rangePrice.tipMinPrice = rangePrice.initialMinPrice;
        rangePrice.tipMaxPrice = rangePrice.initialMaxPrice;
    }
}
function copySet(appliedSubFilters_, selectedSubFilters_, applying) {
    selectedSubFilters_.clear();
    appliedSubFilters_.clear();
    for (const element of applying) {
        selectedSubFilters_.add(element);
        appliedSubFilters_.add(element);
    }
}
function copySet2(originalSet, newSet) {
    originalSet.clear();
    for (const element of newSet) {
        originalSet.add(element);
    }
}
function applyForTotal(appliedSubFilters_, selectedSubFilters_, subFilters_, rangePrice) {
    // block #1 >>
    const selected = selectedSubFilters_;
    const applied = getApplied(appliedSubFilters_, subFilters_);
    let applying = selected;
    if (applied != null) {
        applying = helper.union(selected, applied);
    }
    // block #1 <<
    // block #2 >>
    let items = new Set();
    if (applying.size == 0) {
        items = getItemsByPrice(rangePrice);
    }
    else {
        const applyingByFilter = {};
        groupApplying(applyingByFilter, applying, subFilters_);
        items = getItemsIntersect(applyingByFilter, 0, rangePrice);
    }
    // block #2 <<
    return items.size;
}
exports.applyForTotal = applyForTotal;
function applyFromFilter(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, itemsIds, rangePrice) {
    // block #1 >>
    const selected = selectedSubFilters_;
    const applied = getApplied(appliedSubFilters_, subFilters_);
    let applying = selected;
    if (applied != null) {
        applying = helper.union(selected, applied);
    }
    if (applying.size == 0 && rangePrice.userMinPrice == 0 && rangePrice.userMaxPrice == 0) {
        return;
    }
    // block #1 <<
    // block #2 >>
    let items = new Set();
    if (applying.size == 0) {
        items = getItemsByPrice(rangePrice);
    }
    else {
        const applyingByFilter = {};
        groupApplying(applyingByFilter, applying, subFilters_);
        items = getItemsIntersect(applyingByFilter, 0, rangePrice);
    }
    // block #2 <<
    for (const id of items) {
        itemsIds.push(id);
    }
    const rem = getSubFilters(items);
    enableAllFilters(filters_, 0, false);
    enableAllSubFilters(0, subFilters_, enabledSubfilters_, false);
    for (const id of rem) {
        if (enabledSubfilters_[id] != null) {
            const subFilter = subFilters_[id];
            enabledSubfilters_[id] = true;
            enableFilters(subFilter.filterId, filters_);
        }
    }
    copySet(appliedSubFilters_, selectedSubFilters_, applying);
}
exports.applyFromFilter = applyFromFilter;
function applyFromSubFilter(filterId, appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, rangePrice) {
    // block #1 >>
    let inFilter = new Set();
    if (exports.subfiltersByFilter[filterId] != null) {
        const ids = exports.subfiltersByFilter[filterId];
        inFilter = new Set(ids);
    }
    const selected = helper.intersect(selectedSubFilters_, inFilter);
    const applied = getApplied(appliedSubFilters_, subFilters_);
    let applying = selected;
    if (applied != null) {
        applying = helper.union(selected, applied);
    }
    // block #1 <<
    // block #2 >>
    if (applying.size == 0 && rangePrice.userMinPrice == 0 && rangePrice.userMaxPrice == 0) {
        resetFilters(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, 0, rangePrice);
        return;
    }
    // block #2 <<
    // block #3 >>
    let items = new Set();
    if (applying.size == 0) {
        items = getItemsByPrice(rangePrice);
    }
    else {
        const applyingByFilter = {};
        groupApplying(applyingByFilter, applying, subFilters_);
        items = getItemsIntersect(applyingByFilter, 0, rangePrice);
    }
    // block #3 <<
    // block #4 >>
    if (items.size == 0) {
        enableAllFilters(filters_, filterId, false);
        enableAllSubFilters(filterId, subFilters_, enabledSubfilters_, true);
        copySet(appliedSubFilters_, selectedSubFilters_, applying);
        return;
    }
    // block #4 <<
    // block #5 >>ß
    rangePrice.itemsTotal = items.size;
    const rem = getSubFilters(items);
    enableAllFilters(filters_, 0, false);
    enableAllSubFilters(0, subFilters_, enabledSubfilters_, false);
    //enableAllSubFilters(filterId, subFilters_, enabledSubfilters_, false)
    for (const id of rem) {
        if (enabledSubfilters_[id] != null) {
            const subFilter = subFilters_[id];
            enabledSubfilters_[id] = true;
            enableFilters(subFilter.filterId, filters_);
        }
    }
    // проверить нужно ли здесь копировать?
    copySet(appliedSubFilters_, selectedSubFilters_, applying);
    // block #5 <<
}
exports.applyFromSubFilter = applyFromSubFilter;
function applyAfterRemove(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, countItemsBySubfilter_, rangePrice) {
    // block #1 >>
    const applying = getApplied(appliedSubFilters_, subFilters_);
    if (applying.size === 0 && rangePrice.userMinPrice == 0 && rangePrice.userMaxPrice == 0) {
        resetFilters(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, 0, rangePrice);
        return;
    }
    // block #1 <<
    // block #2 >>
    let items = new Set();
    const applyingByFilter = {};
    if (applying.size == 0) {
        items = getItemsByPrice(rangePrice);
        resetRangePrice(rangePrice);
    }
    else {
        groupApplying(applyingByFilter, applying, subFilters_);
        items = getItemsIntersect(applyingByFilter, 0, rangePrice);
        // if (items.size > 0) {
        //     limitRangePrice(rangePrice, items)
        // } else {
        //     resetFilters(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, 0, rangePrice)
        // }
    }
    // block #2 <<
    // block #3 >>
    if (items.size == 0) {
        resetFilters(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, 0, rangePrice);
        return;
    }
    let filterId = 0;
    if (helper.dictCount(applyingByFilter) == 1) {
        const num = helper.toNumber(helper.dictFirstKey(applyingByFilter));
        if (!Number.isNaN(num)) {
            filterId = num;
        }
    }
    // block #3 <<
    // block #4 >>
    const rem = getSubFilters(items, countItemsBySubfilter_);
    enableAllFilters(filters_, 0, false);
    enableAllSubFilters2(filterId, subFilters_, enabledSubfilters_, false);
    for (const id of rem) {
        if (enabledSubfilters_[id] != null) {
            const subFilter = subFilters_[id];
            enabledSubfilters_[id] = true;
            enableFilters(subFilter.filterId, filters_);
        }
    }
    copySet(appliedSubFilters_, selectedSubFilters_, applying);
    // block #4 <<
}
function applyBeforeEnter(appliedSubFilters_, filterId, filters_, subFilters_, enabledSubfilters_, countItemsBySubfilter_, rangePrice) {
    // block #1 >>                                
    const applied = getApplied(appliedSubFilters_, subFilters_, filterId);
    const applying = applied;
    if (applying.size == 0 && rangePrice.userMinPrice == 0 && rangePrice.userMaxPrice == 0) {
        fillItemsCount(filterId, countItemsBySubfilter_);
        enableAllSubFilters2(0, subFilters_, enabledSubfilters_, true);
        return;
    }
    // block #1 <<
    // block #2 >>
    let items = new Set();
    if (applying.size == 0) {
        items = getItemsByPrice(rangePrice);
    }
    else {
        const applyingByFilter = {};
        groupApplying(applyingByFilter, applying, subFilters_);
        items = getItemsIntersect(applyingByFilter, 0, rangePrice);
    }
    // block #2 <<
    // block #3 >>
    if (items.size == 0) {
        fillItemsCount(filterId, countItemsBySubfilter_);
        resetFilters(appliedSubFilters_, null, filters_, subFilters_, enabledSubfilters_, filterId);
        return;
    }
    // block #3 <<
    // block #4 >>
    const rem = getSubFilters(items, countItemsBySubfilter_);
    disableSubFilters(filterId, subFilters_, enabledSubfilters_);
    for (const id of rem) {
        if (enabledSubfilters_[id] != null) {
            enabledSubfilters_[id] = true;
        }
    }
    // block #4 <<
}
exports.applyBeforeEnter = applyBeforeEnter;
function applyByPrice(rangePrice, filters_, subFilters_) {
    const items = getItemsByPrice(rangePrice);
    const rem = getSubFilters(items);
    enableAllFilters(filters_, 0, false);
    for (const id of rem) {
        const subFilter = subFilters_[id];
        enableFilters(subFilter.filterId, filters_);
    }
}
exports.applyByPrice = applyByPrice;
function removeFilter(appliedSubFilters_, selectedSubFilters_, filterId, filters_, subFilters_, enabledSubfilters_, countItemsBySubfilter_, rangePrice) {
    removeApplied(appliedSubFilters_, selectedSubFilters_, filterId, subFilters_);
    applyAfterRemove(appliedSubFilters_, selectedSubFilters_, filters_, subFilters_, enabledSubfilters_, countItemsBySubfilter_, rangePrice);
}
exports.removeFilter = removeFilter;
function removeApplied(appliedSubFilters_, selectedSubFilters_, filterId = 0, subFilters_) {
    let removing = new Set();
    if (filterId == 0) {
        removing = appliedSubFilters_;
    }
    else {
        for (const id of appliedSubFilters_) {
            if (subFilters_[id].filterId === filterId) {
                removing.add(id);
            }
        }
    }
    const sub1 = helper.substract(appliedSubFilters_, removing);
    copySet2(appliedSubFilters_, sub1);
    const sub2 = helper.substract(selectedSubFilters_, removing);
    // copySet2(selectedSubFilters_, sub1)
    copySet2(selectedSubFilters_, sub2);
}
function setAppliedSubFilters(arr, appliedSubFilters_) {
    for (const i in arr) {
        const num = helper.toNumber(arr[i]);
        if (!Number.isNaN(num)) {
            appliedSubFilters_.add(num);
        }
    }
}
exports.setAppliedSubFilters = setAppliedSubFilters;
function setSelectedSubFilters(arr, selectedSubFilters_) {
    for (const i in arr) {
        const num = helper.toNumber(arr[i]);
        if (!Number.isNaN(num)) {
            selectedSubFilters_.add(num);
        }
    }
}
exports.setSelectedSubFilters = setSelectedSubFilters;
//# sourceMappingURL=main-applying-logic.js.map