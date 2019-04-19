import {getNewConnection} from "./loading-mysql";


export function insUIDs(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_uids(?,?,?,?,?)',
            [post.uid, post.category_id, post.is_cross, post.filter_id, post.entity_type],
            function (error: any, results: any[][], fields: any) {
            if (error) {
                console.log(error.code +" :  "+error.sqlMessage)
                resolve(error)
            }
            resolve("OK")
        });
        connection.end();

    })
}



export function insCategories(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_categories(?)', [post.category_id], function (error: any, results: any[][], fields: any) {
            if (error) {
                console.log(error.code +" :  "+error.sqlMessage)
                resolve(error)
            }
            resolve("OK")
        });
        connection.end();

    })
}


export function insFilter(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_filter(?,?,?,?,?,?)',
            [post.filter_id, post.title, post.category_id, post.filter_type, post.enabled, post.cross],
            function (error: any, results: any[][], fields: any) {
            if (error) {
                console.log(error.code +" :  "+error.sqlMessage)
                resolve(error)
            }
            resolve("OK")
        });
        connection.end();

    })
}



export function insItem(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_item(?,?,?,?,?,?,?,?,?)',
            [post.item_id, post.category_id, post.title, post.thumbnail, post.stars, post.new_price, post.old_price, post.votes, post.discount],
            function (error: any, results: any[][], fields: any) {
                if (error) {
                    console.log(error.code +" :  "+error.sqlMessage)
                    resolve(error)
                }
                resolve("OK")
            });
        connection.end();

    })
}



export function insItemsBySubfilter(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_itemsBySubfilter(?,?,?)',
            [post.item_id, post.category_id, post.subfilter_id],
            function (error: any, results: any[][], fields: any) {
                if (error) {
                    console.log(error.code +" :  "+error.sqlMessage)
                    resolve(error)
                }
                resolve("OK")
            });
        connection.end();

    })
}




export function insPriceByItem(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_priceByItem(?,?,?)',
            [post.item_id, post.category_id, post.price],
            function (error: any, results: any[][], fields: any) {
                if (error) {
                    console.log(error.code +" :  "+error.sqlMessage)
                    resolve(error)
                }
                resolve("OK")
            });
        connection.end();
    })
}



export function insRangePriceByCategory(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_rangePriceByCategory(?,?,?)',
            [post.category_id, post.max_price, post.min_price],
            function (error: any, results: any[][], fields: any) {
                if (error) {
                    console.log(error.code +" :  "+error.sqlMessage)
                    resolve(error)
                }
                resolve("OK")
            });
        connection.end();
    })
}



export function insSubfilter(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_subfilter(?,?,?,?,?,?,?)',
            [post.subfilter_id, post.filter_id, post.category_id, post.title, post.enabled, post.section_header, post.is_cross],
            function (error: any, results: any[][], fields: any) {
                if (error) {
                    console.log(error.code +" :  "+error.sqlMessage)
                    resolve(error)
                }
                resolve("OK")
            });
        connection.end();
    })
}




export function insSubfiltersByItem(post: any) {
    return new Promise(function(resolve, reject) {
        let connection = getNewConnection()
        connection.connect();
        connection.query('CALL sp_ins_subfiltersByItem(?,?,?)',
            [post.category_id, post.item_id, post.subfilter_id],
            function (error: any, results: any[][], fields: any) {
                if (error) {
                    console.log(error.code +" :  "+error.sqlMessage)
                    resolve(error)
                }
                resolve("OK")
            });
        connection.end();
    })
}

