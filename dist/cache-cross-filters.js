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
const converter = __importStar(require("./converter"));
const m = __importStar(require("./index"));
const applyLogic = __importStar(require("./main-applying-logic"));
class CacheCrossFilters {
    constructor() {
        //uuidByFilter: {[filterId: number]: String} = {}
        this.filters = {};
        this.subFilters = {};
        this.subfiltersByFilter = {};
        // for light and heavy client:
        this.filterJSON = {};
        this.subFiltersJSON = {};
        this.uuidByFilterJSON = "";
        // only for heavy client:
        this.subfiltersByFilterJSON = {};
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    // prepare outputs:
    prepareLightClientOutputs() {
        for (const key in this.subFilters) {
            const subf = this.subFilters[key];
            this.subFiltersJSON[key] = converter.subfilterToJson(subf);
        }
        //this.uuidByFilterJSON = converter.dictionaryToJson2(this.uuidByFilter)
    }
    prepareHeavyClientOutputs() {
        if (helper.dictCount(this.filters) === 0 ||
            helper.dictCount(this.subFilters) === 0 ||
            helper.dictCount(this.subfiltersByFilter) === 0) {
            // console.log("cross filters : " + helper.dictCount(this.filters))
            // console.log("cross subFilters : " + helper.dictCount(this.subFilters))
            // console.log("cross subfiltersByFilter : " + helper.dictCount(this.subfiltersByFilter))
            return;
        }
        for (const filterId in this.filters) {
            const filter = this.filters[filterId];
            this.filterJSON[filterId] = converter.filterToJson(filter);
            // console.log("cross filterJSON : " + this.filterJSON[filterId])
        }
        for (const filterId in this.subFilters) {
            const subf = this.subFilters[filterId];
            this.subFiltersJSON[filterId] = converter.subfilterToJson(subf);
            //console.log("cross subFiltersJSON : " + this.subFiltersJSON[filterId])
        }
        for (const filterId in this.subfiltersByFilter) {
            const ids = this.subfiltersByFilter[filterId];
            const tmp = {};
            tmp[filterId] = ids;
            this.subfiltersByFilterJSON[filterId] = converter.dictionaryArrToJson(tmp);
            // console.log("cross subfiltersByFilterJSON : " + this.subfiltersByFilterJSON[filterId])
        }
        //this.uuidByFilterJSON = converter.dictionaryToJson2(this.uuidByFilter)
    }
    clear() {
        this.filters = null;
        this.subFilters = null;
        this.subfiltersByFilter = null;
    }
    // setters:
    setFilters(filter) {
        // this.uuidByFilter[filter.id] = filter.uuid
        this.filters[filter.id] = filter;
    }
    setSubfilters(subfilter) {
        if (this.subFilters[subfilter.filterId] == null) {
            this.subFilters[subfilter.filterId] = Array();
        }
        this.subFilters[subfilter.filterId].push(subfilter);
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
}
exports.CacheCrossFilters = CacheCrossFilters;
//# sourceMappingURL=cache-cross-filters.js.map