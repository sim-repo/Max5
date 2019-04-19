"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const converter = __importStar(require("./converter"));
exports.itemsById = {};
function getResults(data) {
    const nextItemsIds = data.itemsIds;
    const catalogModels = new Array();
    if (nextItemsIds != null && nextItemsIds.length > 0) {
        for (const id of nextItemsIds) {
            if (exports.itemsById[id] != null) {
                catalogModels.push(exports.itemsById[id]);
            }
        }
    }
    const json = converter.catalogModelToJson(catalogModels);
    return {
        items: json
    };
}
exports.getResults = getResults;
//# sourceMappingURL=output-catalog.js.map