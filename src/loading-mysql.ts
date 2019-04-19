import * as m from './index';
import {CacheFiltersByCategory} from "./cache-filters-by-category";
import {UIDModel} from "./model-uuid";
import {FilterModel} from "./model-filter";
import {CacheCrossFilters} from "./cache-cross-filters";
import {SubFilterModel} from "./model-subfilter";
import {RangePrice} from "./model-range-price";
import {CatalogModel} from "./model-catalog";


var mysql = require('mysql');

const myConnectionLimit = 10;
const myHost = 'localhost';
const myUser = 'root';
const myPsw =  'root';
const myDatabase =  'max5';


function getNewConnection() {
    let connection = mysql.createConnection({
        host     : myHost,
        user     : myUser,
        password : myPsw,
        database : myDatabase
    });
    return connection
}


// ********* fill data: ***********

export function fillCategories() {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_categories()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const categoryId = parseInt(row.category_id)
                if (m.cacheByCategory[categoryId] == null) {
                    m.cacheByCategory[categoryId] = new CacheFiltersByCategory(categoryId)
                }
            }
        });
        connection.end();
        resolve(1)
    })
}



export function fillUIDs() {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_uids()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const uid = row.uid
                const category_id = parseInt(row.category_id)
                const cross = (parseInt(row.cross) === 1)
                const filter_id = parseInt(row.filter_id)
                const type = row.type

                const uidModel = new UIDModel(
                    uid,
                    type,
                    category_id,
                    filter_id,
                    cross
                )
                m.uids.push(uidModel)
            }
            m.setUidJSON()
        });
        connection.end();
        resolve(1)
    })
}


export function fillFilters() {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_filters()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const filter_id = parseInt(row.id)
                const title = row.title
                const category_id = parseInt(row.category_id)
                const cross = (parseInt(row.cross) === 1)
                const filter_type = row.filter_type
                const enabled = (parseInt(row.enabled) === 1)

                const filterModel = new FilterModel(
                    filter_id,
                    title,
                    category_id,
                    filter_type,
                    enabled,
                    cross
                )

                const category = m.cacheByCategory[category_id]
                if (category != null) {
                    category.setFilters(filterModel)
                }

                if (filterModel.cross === true) {
                    const cacheCross = CacheCrossFilters.getInstance()
                    cacheCross.setFilters(filterModel)
                }
            }
            connection.end();
            resolve(1)
        });


    })
}


export function fillSubFilters(){
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_subfilters()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;
            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const subfilter_id = parseInt(row.id)
                const filter_id = parseInt(row.filter_id)
                const title = row.title
                const category_id = parseInt(row.category_id)
                const cross = (parseInt(row.cross) === 1)
                const section_header = row.section_header
                const enabled = (parseInt(row.enabled) === 1)

                const subFilterModel = new SubFilterModel(
                    category_id,
                    filter_id,
                    subfilter_id,
                    title,
                    section_header,
                    enabled,
                    cross
                )

                if (subFilterModel.cross == false) {
                    const category = m.cacheByCategory[category_id]
                    if (category != null) {
                        category.setSubfilters(subFilterModel)
                    }
                } else {
                    const cacheSingle = CacheCrossFilters.getInstance()
                    cacheSingle.setSubfilters(subFilterModel)
                }
            }
            connection.end();
            resolve(1)
        });

    })
}



export function fillSubfiltersByItem(){
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_subfiltersByItem()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;

            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const subfilter_id = parseInt(row.subfilter_id)
                const item_id = parseInt(row.item_id)
                const category_id = parseInt(row.category_id)

                const category = m.cacheByCategory[category_id]
                if (category != null) {
                    category.addSubfiltersByItem(item_id,  subfilter_id)
                }
            }
            connection.end();
            resolve(1)
        });

    })
}



export function fillItemsBySubfilter(){

    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_itemsBySubfilter()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;

            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const subfilter_id = parseInt(row.subfilter_id)
                const item_id = parseInt(row.item_id)
                const category_id = parseInt(row.category_id)

                const category = m.cacheByCategory[category_id]
                if (category != null) {
                    category.addItemsBySubfilter(subfilter_id,  item_id)
                }
            }
            connection.end();
            resolve(1)
        });

    })
}


export function fillPriceByItem(){
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_priceByItem()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;

            for (const rowId in results[0]) {
                let row = results[0][rowId]
                const price = parseFloat(row.price)
                const item_id = parseInt(row.item_id)
                const category_id = parseInt(row.category_id)

                const category = m.cacheByCategory[category_id]
                if (category != null) {
                    category.setPriceByItem(item_id, price)
                }
            }
            connection.end();
            resolve(1)
        });

    })
}


export function fillRangePriceByCategory(){
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_rangePriceByCategory()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;

            for (const rowId in results[0]) {
                let row = results[0][rowId]

                const category_id = parseInt(row.category_id)
                const min = parseInt(row.min_price)
                const max = parseInt(row.max_price)

                const rangePrice = new RangePrice()
                rangePrice.categoryId = category_id
                rangePrice.userMinPrice = min
                rangePrice.userMaxPrice = max
                rangePrice.tipMinPrice = min
                rangePrice.tipMaxPrice = max

                const category = m.cacheByCategory[category_id]
                if (category != null) {
                    category.setRangePrice(rangePrice)
                }
            }
            connection.end();
            resolve(1)
        });

    })
}


export function fillCatalog(){
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_get_item()', function (error: any, results: any[][], fields: any) {
            if (error) throw error;

            for (const rowId in results[0]) {
                let row = results[0][rowId]

                const item_id = parseInt(row.item_id)
                const category_id =  parseInt(row.category_id)
                const name = row.name
                const new_price = parseFloat(row.new_price)
                const old_price = parseFloat(row.old_price)
                const stars = parseInt(row.stars)
                const thumbnail = row.thumbnail
                const votes = parseInt(row.votes)
                const discount = parseInt(row.discount)

                const item = new CatalogModel(
                    item_id,
                    category_id,
                    name,
                    thumbnail,
                    stars,
                    new_price,
                    old_price,
                    votes,
                    discount
                )

                const category = m.cacheByCategory[category_id]
                if (category != null) {
                    category.setItem(item)
                }
            }
            connection.end();
            resolve(1)
        });

    })
}

