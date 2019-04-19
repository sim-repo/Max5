"use strict";
// example of calc perfomance:
// let t0 = new Date().getTime()
// const applied = getApplied(appliedSubFilters_, subFilters_)
// let t1 = new Date().getTime()                                
// console.log("1: " + (t1 - t0) + " milliseconds.")
Object.defineProperty(exports, "__esModule", { value: true });
function dictCount(dict) {
    if (dict == null) {
        return 0;
    }
    return Object.keys(dict).length;
}
exports.dictCount = dictCount;
function dictFirstKey(dict) {
    if (dict == null) {
        return "";
    }
    return Object.keys(dict)[0];
}
exports.dictFirstKey = dictFirstKey;
function intersect(a, b) {
    return new Set([...a].filter(x => b.has(x)));
}
exports.intersect = intersect;
function union(a, b) {
    return new Set([...a, ...b]);
}
exports.union = union;
function substract(a, b) {
    return new Set([...a].filter(x => !b.has(x)));
}
exports.substract = substract;
function toNumber(num) {
    return parseInt(num);
}
exports.toNumber = toNumber;
function stringIsNullOrEmpty(value) {
    return value == null || value === "" || value.length === 0;
}
exports.stringIsNullOrEmpty = stringIsNullOrEmpty;
//# sourceMappingURL=helper.js.map