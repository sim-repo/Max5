"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataload = __importStar(require("./loading-mysql"));
const m = __importStar(require("./index"));
const cache_cross_filters_1 = require("./cache-cross-filters");
function loadGlobalCache() {
    return new Promise((res1, reject) => {
        dataload.fillCategories()
            .then(() => {
            const p1 = new Promise((res, rej) => {
                res(dataload.fillFilters());
            });
            const p2 = new Promise((res, rej) => {
                res(dataload.fillSubFilters());
            });
            const p3 = new Promise((res, rej) => {
                res(dataload.fillItemsBySubfilter());
            });
            const p4 = new Promise((res, rej) => {
                res(dataload.fillPriceByItem());
            });
            const p5 = new Promise((res, rej) => {
                res(dataload.fillRangePriceByCategory());
            });
            const p6 = new Promise((res, rej) => {
                res(dataload.fillSubfiltersByItem());
            });
            const p7 = new Promise((res, rej) => {
                res(dataload.fillCatalog());
            });
            const p8 = new Promise((res, rej) => {
                res(dataload.fillUIDs());
            });
            Promise.all([p1, p2, p3, p4, p5, p6, p7, p8]).then(values2 => {
                const cacheSingle = cache_cross_filters_1.CacheCrossFilters.getInstance();
                if (m.clientMode === m.ClientMode.Heavy) {
                    cacheSingle.prepareHeavyClientOutputs();
                }
                if (m.clientMode === m.ClientMode.Light) {
                    cacheSingle.prepareLightClientOutputs();
                }
                for (const id in m.cacheByCategory) {
                    const store = m.cacheByCategory[Number(id)];
                    if (m.clientMode === m.ClientMode.Heavy) {
                        store.prepareHeavyClientOutputs();
                    }
                    if (m.clientMode === m.ClientMode.Light) {
                        store.prepareLightClientOutputs();
                    }
                }
                res1(1);
            }).catch(function (error) { console.log('mistake!', error); });
        }).catch(function (error) { console.log('mistake!', error); });
    }).catch(function (error) { console.log('mistake!', error); });
}
exports.loadGlobalCache = loadGlobalCache;
//# sourceMappingURL=loading-sequence.js.map