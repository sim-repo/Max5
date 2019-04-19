"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterEnum;
(function (FilterEnum) {
    FilterEnum["select"] = "select";
    FilterEnum["range"] = "range";
    FilterEnum["section"] = "section";
})(FilterEnum || (FilterEnum = {}));
class FilterModel {
    constructor(id, title, categoryId, filterEnum, enabled, cross) {
        this.id = 0;
        this.title = "";
        this.categoryId = 0;
        this.filterEnum = FilterEnum.select;
        this.enabled = true;
        this.cross = false;
        this.id = id;
        this.title = title;
        this.categoryId = categoryId;
        this.filterEnum = filterEnum;
        this.enabled = enabled;
        this.cross = cross;
    }
}
exports.FilterModel = FilterModel;
//# sourceMappingURL=model-filter.js.map