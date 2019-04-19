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
const applyLogic = __importStar(require("./main-applying-logic"));
const outputCatalog = __importStar(require("./output-catalog"));
const helper = __importStar(require("./helper"));
class CacheFiltersByCategory {
    constructor(categoryId) {
        this.categoryId = 0;
        this.itemIds = [];
        this.items = [];
        this.filters = {};
        this.subFilters = {};
        this.subfiltersByFilter = {};
        this.itemsBySubfilter = {};
        this.priceByItem = {};
        this.subfiltersByItem = {};
        // for light and heavy client:
        this.filtersJSON = "";
        this.subFiltersJSON = "";
        this.itemsIdsJSON = "";
        this.userMinPriceJSON = "";
        this.userMaxPriceJSON = "";
        // only for heavy client:
        this.subfiltersByFilterJSON = "";
        this.subfiltersByItemJSON = "";
        this.itemsBySubfilterJSON = "";
        this.priceByItemJSON = "";
        this.categoryId = categoryId;
    }
    // prepare outputs:
    prepareLightClientOutputs() {
        this.filtersJSON = converter.filtersToJson(this.filters);
        this.subFiltersJSON = converter.subfiltersToJson(this.subFilters);
        this.itemsIdsJSON = converter.arrToJson(this.itemIds);
        this.userMinPriceJSON = JSON.stringify({ "minPrice": String(this.rangePrice.userMinPrice) });
        this.userMaxPriceJSON = JSON.stringify({ "maxPrice": String(this.rangePrice.userMaxPrice) });
    }
    prepareHeavyClientOutputs() {
        if (helper.dictCount(this.filters) === 0 ||
            helper.dictCount(this.subFilters) === 0 ||
            helper.dictCount(this.subfiltersByFilter) === 0 ||
            helper.dictCount(this.itemsBySubfilter) === 0 ||
            helper.dictCount(this.priceByItem) === 0 ||
            helper.dictCount(this.subfiltersByItem) === 0 ||
            this.rangePrice == null) {
            console.log("filters : " + helper.dictCount(this.filters));
            console.log("subFilters : " + helper.dictCount(this.subFilters));
            console.log("subfiltersByFilter : " + helper.dictCount(this.subfiltersByFilter));
            console.log("itemsBySubfilter : " + helper.dictCount(this.itemsBySubfilter));
            console.log("priceByItem : " + helper.dictCount(this.priceByItem));
            console.log("rangePrice : " + this.rangePrice == null);
            console.log("subfiltersByItem : " + helper.dictCount(this.subfiltersByItem));
            return;
        }
        this.filtersJSON = converter.filtersToJson(this.filters);
        this.subFiltersJSON = converter.subfiltersToJson(this.subFilters);
        this.itemsIdsJSON = converter.arrToJson(this.itemIds);
        this.userMinPriceJSON = JSON.stringify({ "minPrice": String(this.rangePrice.userMinPrice) });
        this.userMaxPriceJSON = JSON.stringify({ "maxPrice": String(this.rangePrice.userMaxPrice) });
        this.subfiltersByFilterJSON = converter.dictionaryArrToJson(this.subfiltersByFilter);
        this.subfiltersByItemJSON = converter.dictionaryArrToJson(this.subfiltersByItem);
        this.itemsBySubfilterJSON = converter.dictionaryArrToJson(this.itemsBySubfilter);
        this.priceByItemJSON = converter.dictionaryToJson(this.priceByItem);
    }
    clear() {
        this.itemIds = null;
        this.filters = null;
        this.subFilters = null;
        this.subfiltersByFilter = null;
        this.itemsBySubfilter = null;
        this.priceByItem = null;
        this.subfiltersByItem = null;
    }
    // setters:
    setFilters(filter) {
        this.filters[filter.id] = filter;
    }
    setSubfilters(subfilter) {
        this.subFilters[subfilter.id] = subfilter;
        if (m.clientMode === m.ClientMode.Heavy) {
            if (this.subfiltersByFilter[subfilter.filterId] == null) {
                this.subfiltersByFilter[subfilter.filterId] = new Array();
            }
            this.subfiltersByFilter[subfilter.filterId].push(subfilter.id);
        }
        if (m.clientMode === m.ClientMode.Light) {
            if (applyLogic.subfiltersByFilter[subfilter.filterId] == null) {
                applyLogic.subfiltersByFilter[subfilter.filterId] = new Array();
            }
            applyLogic.subfiltersByFilter[subfilter.filterId].push(subfilter.id);
        }
    }
    addSubfiltersByItem(itemId, subfilterId) {
        if (m.clientMode === m.ClientMode.Heavy) {
            if (this.subfiltersByItem[itemId] == null) {
                this.subfiltersByItem[itemId] = [];
            }
            this.subfiltersByItem[itemId].push(subfilterId);
        }
        if (m.clientMode === m.ClientMode.Light) {
            if (applyLogic.subfiltersByItem[itemId] == null) {
                applyLogic.subfiltersByItem[itemId] = [];
            }
            applyLogic.subfiltersByItem[itemId].push(subfilterId);
        }
    }
    setSubfiltersByItem(itemId, subfilterIds) {
        if (m.clientMode === m.ClientMode.Heavy) {
            this.subfiltersByItem[itemId] = subfilterIds;
        }
        if (m.clientMode === m.ClientMode.Light) {
            applyLogic.subfiltersByItem[itemId] = subfilterIds;
        }
    }
    addItemsBySubfilter(subfilterId, itemId) {
        if (m.clientMode === m.ClientMode.Heavy) {
            if (this.itemsBySubfilter[subfilterId] == null) {
                this.itemsBySubfilter[subfilterId] = [];
            }
            this.itemsBySubfilter[subfilterId].push(itemId);
        }
        if (m.clientMode === m.ClientMode.Light) {
            if (applyLogic.itemsBySubfilter[subfilterId] == null) {
                applyLogic.itemsBySubfilter[subfilterId] = [];
            }
            applyLogic.itemsBySubfilter[subfilterId].push(itemId);
        }
    }
    setItemsBySubfilter(subfilterId, itemIds) {
        if (m.clientMode === m.ClientMode.Heavy) {
            this.itemsBySubfilter[subfilterId] = itemIds;
        }
        if (m.clientMode == m.ClientMode.Light) {
            applyLogic.itemsBySubfilter[subfilterId] = itemIds;
        }
    }
    setPriceByItem(itemId, price) {
        if (m.clientMode === m.ClientMode.Heavy) {
            this.priceByItem[itemId] = price;
        }
        if (m.clientMode === m.ClientMode.Light) {
            applyLogic.priceByItem[itemId] = price;
        }
    }
    setRangePrice(rangePrice) {
        this.rangePrice = rangePrice;
    }
    setItem(item) {
        this.itemIds.push(item.id);
        this.items.push(item);
        outputCatalog.itemsById[item.id] = item;
    }
}
exports.CacheFiltersByCategory = CacheFiltersByCategory;
//# sourceMappingURL=cache-filters-by-category.js.map