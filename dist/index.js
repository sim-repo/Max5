"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applyFilter = __importStar(require("./output-apply-filter"));
const applySubfilter = __importStar(require("./output-apply-subfilter"));
const applyByPrice = __importStar(require("./output-apply-price"));
const applyEnter = __importStar(require("./output-apply-subf-enter"));
const removeFilter = __importStar(require("./output-remove-filter"));
const prefetching = __importStar(require("./output-catalog"));
const calcMidTotal = __importStar(require("./output-items-total"));
const catalogTotals = __importStar(require("./output-catalog-totals"));
const chunk1 = __importStar(require("./output-chunk1"));
const chunk2 = __importStar(require("./output-chunk2"));
const chunk3 = __importStar(require("./output-chunk3"));
const chunk4 = __importStar(require("./output-chunk4"));
const chunk5 = __importStar(require("./output-chunk5"));
const uidsout = __importStar(require("./output-cross-uids"));
const helper = __importStar(require("./helper"));
const applyLogic = __importStar(require("./main-applying-logic"));
const loadSequence = __importStar(require("./loading-sequence"));
const lightFilterEntities = __importStar(require("./output-light-filter-entities"));
const converter = __importStar(require("./converter"));
const parser = __importStar(require("body-parser"));
const insMysq = __importStar(require("./insert-mysql"));
const app = express_1.default();
const port = 3000; // default port to listen
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
var ClientMode;
(function (ClientMode) {
    ClientMode[ClientMode["Light"] = 0] = "Light";
    ClientMode[ClientMode["Heavy"] = 1] = "Heavy";
})(ClientMode = exports.ClientMode || (exports.ClientMode = {}));
exports.clientMode = ClientMode.Heavy;
exports.cacheByCategory = {};
exports.uids = [];
exports.uidsJSON = "";
let cacheLoadInProgress = false;
// ********* cache controls: ***********
exports.useCacheFilters = true;
exports.useCacheSubFilters = true;
exports.useCacheSubfiltersByFilter = true;
exports.useCacheSubfiltersByItem = true;
exports.useCacheItemsBySubfilter = true;
exports.prefetchLimit = 20;
function setCache_Filters(val) {
    exports.useCacheFilters = val;
}
exports.setCache_Filters = setCache_Filters;
function setCache_Subfilters(val) {
    exports.useCacheSubFilters = val;
}
exports.setCache_Subfilters = setCache_Subfilters;
function setCache_ItemsBySubfilter(val) {
    exports.useCacheItemsBySubfilter = val;
}
exports.setCache_ItemsBySubfilter = setCache_ItemsBySubfilter;
function setCache_SubfiltersByFilter(val) {
    exports.useCacheSubfiltersByFilter = val;
}
exports.setCache_SubfiltersByFilter = setCache_SubfiltersByFilter;
function setCache_SubfiltersByItem(val) {
    exports.useCacheSubfiltersByItem = val;
}
exports.setCache_SubfiltersByItem = setCache_SubfiltersByItem;
function setUidJSON() {
    exports.uidsJSON = converter.uidsToJson(exports.uids);
}
exports.setUidJSON = setUidJSON;
function isGlobalCacheReady() {
    if (exports.clientMode === ClientMode.Light) {
        if (helper.dictCount(exports.cacheByCategory) === 0 ||
            helper.dictCount(applyLogic.subfiltersByFilter) === 0 ||
            helper.dictCount(applyLogic.subfiltersByItem) === 0 ||
            helper.dictCount(applyLogic.itemsBySubfilter) === 0 ||
            helper.dictCount(applyLogic.priceByItem) === 0) {
            return false;
        }
    }
    if (exports.clientMode === ClientMode.Heavy) {
        if (helper.dictCount(exports.cacheByCategory) === 0) {
            return false;
        }
    }
    return true;
}
function runInsMethod(data) {
    const fname = data.fname;
    try {
        switch (fname) {
            case "insUIDs": {
                return insMysq.insUIDs(data);
            }
            case "insCategories": {
                return insMysq.insCategories(data);
            }
            case "insFilter": {
                return insMysq.insFilter(data);
            }
            case "insItem": {
                return insMysq.insItem(data);
            }
            case "insItemsBySubfilter": {
                return insMysq.insItemsBySubfilter(data);
            }
            case "insPriceByItem": {
                return insMysq.insPriceByItem(data);
            }
            case "insRangePriceByCategory": {
                return insMysq.insRangePriceByCategory(data);
            }
            case "insSubfilter": {
                return insMysq.insSubfilter(data);
            }
            case "insSubfiltersByItem": {
                return insMysq.insSubfiltersByItem(data);
            }
            default: {
                return new Promise(function (resolve, reject) {
                    resolve("no method found: " + fname);
                });
            }
        }
    }
    catch (ex) {
        console.log(ex);
    }
}
function runGetMethod(data) {
    const fname = data.fname;
    try {
        switch (fname) {
            case "doApplyFromFilter": {
                return applyFilter.getResults(data);
            }
            case "doApplyFromSubfilter": {
                return applySubfilter.getResults(data);
            }
            case "doApplyPrice": {
                return applyByPrice.getResults(data);
            }
            case "doApplySubfilterEnter": {
                return applyEnter.getResults(data);
            }
            case "doRemoveFilter": {
                return removeFilter.getResults(data);
            }
            case "getLightFilterEntities": {
                return lightFilterEntities.getResults(data);
            }
            case "getPrefetching": {
                return prefetching.getResults(data);
            }
            case "doCalcMidTotal": {
                return calcMidTotal.getResults(data);
            }
            case "getCatalogTotals": {
                return catalogTotals.getResults(data);
            }
            case "getFiltersChunk1": {
                return chunk1.getResults(data);
            }
            case "getSubfiltersChunk2": {
                return chunk2.getResults(data);
            }
            case "getItemsChunk3": {
                return chunk3.getResults(data);
            }
            case "getCrossChunk4": {
                return chunk4.getResults(data);
            }
            case "getCategoryFiltersChunk5": {
                return chunk5.getResults(data);
            }
            case "getUIDs": {
                return uidsout.getResults(data);
            }
            default: {
                return { res: "no method found: " + fname };
            }
        }
    }
    catch (ex) {
        console.log(ex);
    }
}
app.post("/functions2", (req, res) => {
    console.log("request: " + req.body.msg);
    console.log("description: " + req.body.description);
    res.send('Got a POST request');
});
app.post("/functions", (req, res) => {
    const method = req.body.method;
    //  console.log("request: " + method + ", cacheLoadInProgress: "+ cacheLoadInProgress)
    const fname = req.body.fname;
    if (method === "GET") {
        if (isGlobalCacheReady() === false) {
            console.log("force: read from db(): " + fname);
            if (cacheLoadInProgress) {
                console.log("request has been rejected: " + fname);
                res.send('');
            }
            cacheLoadInProgress = true;
            return new Promise((res3, reject) => {
                loadSequence.loadGlobalCache()
                    .then(function () {
                    cacheLoadInProgress = false;
                    res.send(runGetMethod(req.body));
                }).catch(function (error) {
                    console.log('mistake!', error);
                });
            });
        }
        console.log("read from cache by mobile request: " + fname);
        res.send(runGetMethod(req.body));
    }
    if (method === "INS") {
        runInsMethod(req.body)
            .then(function (msg) {
            res.send(msg);
        })
            .catch(function (error) {
            res.send(error);
        });
    }
});
//# sourceMappingURL=index.js.map