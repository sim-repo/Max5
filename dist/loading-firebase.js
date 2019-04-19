"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = require("request-promise");
// ********* cache controls: ***********
function checkCache_Filters() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.checkCache_Filters = checkCache_Filters;
function checkCache_SubFilters() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.checkCache_SubFilters = checkCache_SubFilters;
function checkCache_ItemsBySubfilter() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.checkCache_ItemsBySubfilter = checkCache_ItemsBySubfilter;
function checkCache_SubfiltersByFilter() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.checkCache_SubfiltersByFilter = checkCache_SubfiltersByFilter;
function checkCache_SubfiltersByItem() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.checkCache_SubfiltersByItem = checkCache_SubfiltersByItem;
// ********* fill data: ***********
function fillCategories() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillCategories = fillCategories;
function fillUIDs() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillUIDs = fillUIDs;
function fillFilters() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillFilters = fillFilters;
function fillSubFilters() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillSubFilters = fillSubFilters;
function fillSubfiltersByItem() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillSubfiltersByItem = fillSubfiltersByItem;
function fillItemsBySubfilter() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillItemsBySubfilter = fillItemsBySubfilter;
function fillPriceByItem() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillPriceByItem = fillPriceByItem;
function fillRangePriceByCategory() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillRangePriceByCategory = fillRangePriceByCategory;
function fillCatalog() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        // Do async job
        request_promise_1.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}
exports.fillCatalog = fillCatalog;
//# sourceMappingURL=loading-firebase.js.map