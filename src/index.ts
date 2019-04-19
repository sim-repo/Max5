import express from "express";
import * as applyFilter from './output-apply-filter';
import * as applySubfilter from './output-apply-subfilter';
import * as applyByPrice from './output-apply-price';
import * as applyEnter from './output-apply-subf-enter';
import * as removeFilter from './output-remove-filter';
import * as prefetching from './output-catalog';
import * as calcMidTotal from './output-items-total'
import * as catalogTotals from './output-catalog-totals'
import * as chunk1 from './output-chunk1'
import * as chunk2 from './output-chunk2'
import * as chunk3 from './output-chunk3'
import * as chunk4 from './output-chunk4'
import * as chunk5 from './output-chunk5'
import * as uidsout from './output-cross-uids'
import * as helper from './helper';
import * as applyLogic from './main-applying-logic';
import * as loadSequence from './loading-sequence';
import { CacheFiltersByCategory } from './cache-filters-by-category';
import * as lightFilterEntities from './output-light-filter-entities'
import { UIDModel } from './model-uuid';
import * as converter from './converter';
import * as parser from 'body-parser';
import * as mysql from "./loading-mysql";


const app = express();
const port = 8080; // default port to listen
app.use( parser.json() );
app.use(parser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} )




export enum ClientMode {
    Light,
    Heavy
}


export let clientMode: ClientMode = ClientMode.Heavy
export let cacheByCategory: { [id: number]: CacheFiltersByCategory } = {};
export let uids: UIDModel[] = []
export let uidsJSON: String = ""
let cacheLoadInProgress = false

// ********* cache controls: ***********

export let useCacheFilters = true
export let useCacheSubFilters = true
export let useCacheSubfiltersByFilter = true
export let useCacheSubfiltersByItem = true
export let useCacheItemsBySubfilter = true

export const prefetchLimit = 20

export function setCache_Filters(val: boolean) {
    useCacheFilters = val
}

export function setCache_Subfilters(val: boolean) {
    useCacheSubFilters = val
}

export function setCache_ItemsBySubfilter(val: boolean) {
    useCacheItemsBySubfilter = val
}

export function setCache_SubfiltersByFilter(val: boolean) {
    useCacheSubfiltersByFilter = val
}

export function setCache_SubfiltersByItem(val: boolean) {
    useCacheSubfiltersByItem = val
}

export function setUidJSON(){
    uidsJSON = converter.uidsToJson(uids)
}


function isGlobalCacheReady(): Boolean {
    if (clientMode == ClientMode.Light) {
        if (helper.dictCount(cacheByCategory) === 0 ||
            helper.dictCount(applyLogic.subfiltersByFilter) === 0 ||
            helper.dictCount(applyLogic.subfiltersByItem) === 0 ||
            helper.dictCount(applyLogic.itemsBySubfilter) === 0 ||
            helper.dictCount(applyLogic.priceByItem) === 0) {
            return false
        }
    }
    if (clientMode == ClientMode.Heavy) {
        if (helper.dictCount(cacheByCategory) === 0) {
            return false
        }
    }
    return true
}



function runMethod(data: any) {

    const method  = data.method as String

    switch (method) {
        case "doApplyFromFilter": {
            return applyFilter.getResults(data)
        }

        case "doApplyFromSubfilter": {
            return applySubfilter.getResults(data)
        }

        case "doApplyPrice": {
            return applyByPrice.getResults(data)
        }

        case "doApplySubfilterEnter": {
            return applyEnter.getResults(data)
        }

        case "doRemoveFilter": {
            return removeFilter.getResults(data)
        }

        case "getLightFilterEntities": {
            return lightFilterEntities.getResults(data)
        }

        case "getPrefetching": {
            return prefetching.getResults(data)
        }

        case "doCalcMidTotal": {
            return calcMidTotal.getResults(data)
        }

        case "getCatalogTotals": {
            return catalogTotals.getResults(data)
        }

        case "getFiltersChunk1": {
            return chunk1.getResults(data)
        }

        case "getSubfiltersChunk2": {
            return chunk2.getResults(data)
        }

        case "getItemsChunk3": {
            return chunk3.getResults(data)
        }

        case "getCrossChunk4": {
            return chunk4.getResults(data)
        }

        case "getCategoryFiltersChunk5": {
            return chunk5.getResults(data)
        }

        case "getUIDs": {
            return uidsout.getResults(data)
        }

        default: {
            return {res: "no method found: "+method}
        }
    }
}

app.post( "/functions2", ( req, res ) => {
    console.log("request: " + req.body.msg )
    console.log("description: " + req.body.description )
    res.send('Got a POST request');
});

app.post( "/functions", ( req, res ) => {
    const method = req.body.method as String
    //  console.log("request: " + method + ", cacheLoadInProgress: "+ cacheLoadInProgress)

    if (isGlobalCacheReady() === false) {
        console.log("force: read from db(): "+ method)
        if (cacheLoadInProgress) {
            console.log("request has been rejected: " + method)
            res.send('');
        }
        cacheLoadInProgress = true
        return new Promise((res3, reject) => {
            loadSequence.loadGlobalCache()
                .then(function() {
                    cacheLoadInProgress = false
                    res.send(runMethod(req.body));
                }).catch(function (error) {console.log('mistake!', error)})
        })
    }

    console.log("read from cache by mobile request: "+ method)
    res.send( runMethod(req.body))
} );

