"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const m = __importStar(require("./index"));
const cache_filters_by_category_1 = require("./cache-filters-by-category");
const model_uuid_1 = require("./model-uuid");
const model_filter_1 = require("./model-filter");
const cache_cross_filters_1 = require("./cache-cross-filters");
const model_subfilter_1 = require("./model-subfilter");
const model_range_price_1 = require("./model-range-price");
const model_catalog_1 = require("./model-catalog");
var mysql = require('mysql');
const myConnectionLimit = 10;
const myHost = 'localhost';
const myUser = 'root';
const myPsw = 'root';
const myDatabase = 'max5';
function getNewConnection() {
    let connection = mysql.createConnection({
        host: myHost,
        user: myUser,
        password: myPsw,
        database: myDatabase
    });
    connection.on('error', function () {
        console.log("error in mysql");
    });
    return connection;
}
exports.getNewConnection = getNewConnection;
// ********* fill data: ***********
function fillCategories() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_categories()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const categoryId = parseInt(row.category_id);
                if (m.cacheByCategory[categoryId] == null) {
                    m.cacheByCategory[categoryId] = new cache_filters_by_category_1.CacheFiltersByCategory(categoryId);
                }
            }
        });
        connection.end();
        resolve(1);
    });
}
exports.fillCategories = fillCategories;
function fillUIDs() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_uids()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const uid = row.uid;
                const category_id = parseInt(row.category_id);
                const cross = (parseInt(row.cross) === 1);
                const filter_id = parseInt(row.filter_id);
                const type = row.type;
                const uidModel = new model_uuid_1.UIDModel(uid, type, category_id, filter_id, cross);
                m.uids.push(uidModel);
            }
            m.setUidJSON();
        });
        connection.end();
        resolve(1);
    });
}
exports.fillUIDs = fillUIDs;
function fillFilters() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_filters()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const filter_id = parseInt(row.id);
                const title = row.title;
                const category_id = parseInt(row.category_id);
                const cross = (parseInt(row.cross) === 1);
                const filter_type = row.filter_type;
                const enabled = (parseInt(row.enabled) === 1);
                const filterModel = new model_filter_1.FilterModel(filter_id, title, category_id, filter_type, enabled, cross);
                const category = m.cacheByCategory[category_id];
                if (category != null) {
                    category.setFilters(filterModel);
                }
                if (filterModel.cross === true) {
                    const cacheCross = cache_cross_filters_1.CacheCrossFilters.getInstance();
                    cacheCross.setFilters(filterModel);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillFilters = fillFilters;
function fillSubFilters() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_subfilters()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const subfilter_id = parseInt(row.id);
                const filter_id = parseInt(row.filter_id);
                const title = row.title;
                const category_id = parseInt(row.category_id);
                const cross = (parseInt(row.cross) === 1);
                const section_header = row.section_header;
                const enabled = (parseInt(row.enabled) === 1);
                const subFilterModel = new model_subfilter_1.SubFilterModel(category_id, filter_id, subfilter_id, title, section_header, enabled, cross);
                if (subFilterModel.cross == false) {
                    const category = m.cacheByCategory[category_id];
                    if (category != null) {
                        category.setSubfilters(subFilterModel);
                    }
                }
                else {
                    const cacheSingle = cache_cross_filters_1.CacheCrossFilters.getInstance();
                    cacheSingle.setSubfilters(subFilterModel);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillSubFilters = fillSubFilters;
function fillSubfiltersByItem() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_subfiltersByItem()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const subfilter_id = parseInt(row.subfilter_id);
                const item_id = parseInt(row.item_id);
                const category_id = parseInt(row.category_id);
                const category = m.cacheByCategory[category_id];
                if (category != null) {
                    category.addSubfiltersByItem(item_id, subfilter_id);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillSubfiltersByItem = fillSubfiltersByItem;
function fillItemsBySubfilter() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_itemsBySubfilter()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const subfilter_id = parseInt(row.subfilter_id);
                const item_id = parseInt(row.item_id);
                const category_id = parseInt(row.category_id);
                const category = m.cacheByCategory[category_id];
                if (category != null) {
                    category.addItemsBySubfilter(subfilter_id, item_id);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillItemsBySubfilter = fillItemsBySubfilter;
function fillPriceByItem() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_priceByItem()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const price = parseFloat(row.price);
                const item_id = parseInt(row.item_id);
                const category_id = parseInt(row.category_id);
                const category = m.cacheByCategory[category_id];
                if (category != null) {
                    category.setPriceByItem(item_id, price);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillPriceByItem = fillPriceByItem;
function fillRangePriceByCategory() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_rangePriceByCategory()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const category_id = parseInt(row.category_id);
                const min = parseInt(row.min_price);
                const max = parseInt(row.max_price);
                const rangePrice = new model_range_price_1.RangePrice();
                rangePrice.categoryId = category_id;
                rangePrice.userMinPrice = min;
                rangePrice.userMaxPrice = max;
                rangePrice.tipMinPrice = min;
                rangePrice.tipMaxPrice = max;
                const category = m.cacheByCategory[category_id];
                if (category != null) {
                    category.setRangePrice(rangePrice);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillRangePriceByCategory = fillRangePriceByCategory;
function fillCatalog() {
    return new Promise(function (resolve, reject) {
        let connection = getNewConnection();
        connection.connect();
        connection.query('CALL sp_get_item()', function (error, results, fields) {
            if (error)
                throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId];
                const item_id = parseInt(row.item_id);
                const category_id = parseInt(row.category_id);
                const name = row.name;
                const new_price = parseFloat(row.new_price);
                const old_price = parseFloat(row.old_price);
                const stars = parseInt(row.stars);
                const thumbnail = row.thumbnail;
                const votes = parseInt(row.votes);
                const discount = parseInt(row.discount);
                const item = new model_catalog_1.CatalogModel(item_id, category_id, name, thumbnail, stars, new_price, old_price, votes, discount);
                const category = m.cacheByCategory[category_id];
                if (category != null) {
                    category.setItem(item);
                }
            }
            connection.end();
            resolve(1);
        });
    });
}
exports.fillCatalog = fillCatalog;
//# sourceMappingURL=loading-mysql.js.map