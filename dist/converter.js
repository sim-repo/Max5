"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrToJson(arr) {
    const obj = {};
    obj["items"] = [];
    arr.forEach(id => obj["items"].push(id));
    const json = JSON.stringify(obj);
    return json;
}
exports.arrToJson = arrToJson;
function catalogModelToJson(arr) {
    const obj = {};
    obj["items"] = [];
    arr.forEach(id => obj["items"].push(id));
    const json = JSON.stringify(obj);
    return json;
}
exports.catalogModelToJson = catalogModelToJson;
//*** Filters ***//
function dictionaryToJson(dict) {
    const obj = {};
    obj["items"] = [];
    for (const subfID in dict) {
        const id = parseInt(subfID);
        const o = {};
        o[id] = dict[subfID];
        obj["items"].push(o);
    }
    const json = JSON.stringify(obj);
    return json;
}
exports.dictionaryToJson = dictionaryToJson;
function dictionaryToJson2(dict) {
    const obj = {};
    obj["items"] = [];
    for (const key in dict) {
        const id = parseInt(key);
        const o = {};
        o[id] = dict[key];
        obj["items"].push(o);
    }
    const json = JSON.stringify(obj);
    return json;
}
exports.dictionaryToJson2 = dictionaryToJson2;
function filtersToJson(dict) {
    const obj = {};
    obj["items"] = [];
    for (const key in dict) {
        const model = dict[key];
        obj["items"].push(model);
    }
    const json = JSON.stringify(obj);
    return json;
}
exports.filtersToJson = filtersToJson;
function filterToJson(filter) {
    const obj = {};
    obj["items"] = [];
    obj["items"].push(filter);
    const json = JSON.stringify(obj);
    return json;
}
exports.filterToJson = filterToJson;
function uidsToJson(uids) {
    const obj = {};
    obj["items"] = [];
    obj["items"] = uids;
    const json = JSON.stringify(obj);
    return json;
}
exports.uidsToJson = uidsToJson;
function subfiltersToJson(dict) {
    const obj = {};
    obj["items"] = [];
    for (const key in dict) {
        const model = dict[key];
        obj["items"].push(model);
    }
    const json = JSON.stringify(obj);
    return json;
}
exports.subfiltersToJson = subfiltersToJson;
function subfilterToJson(arr) {
    const obj = {};
    obj["items"] = [];
    arr.forEach(id => obj["items"].push(id));
    const json = JSON.stringify(obj);
    return json;
}
exports.subfilterToJson = subfilterToJson;
function dictionaryArrToJson(dict) {
    const obj = {};
    obj["items"] = dict;
    const json = JSON.stringify(obj);
    return json;
}
exports.dictionaryArrToJson = dictionaryArrToJson;
function singleToJson(key, val) {
    return JSON.stringify({ key: val });
}
exports.singleToJson = singleToJson;
//# sourceMappingURL=converter.js.map