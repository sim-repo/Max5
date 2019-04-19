"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubFilterModel {
    constructor(categoryId, filterId, id, title, sectionHeader, enabled, cross) {
        this.id = 0;
        this.categoryId = 0;
        this.filterId = 0;
        this.title = "";
        this.sectionHeader = "";
        this.enabled = true;
        this.cross = false;
        this.categoryId = categoryId;
        this.filterId = filterId;
        this.id = id;
        this.title = title;
        this.sectionHeader = sectionHeader;
        this.enabled = enabled;
        this.cross = cross;
    }
}
exports.SubFilterModel = SubFilterModel;
//# sourceMappingURL=model-subfilter.js.map