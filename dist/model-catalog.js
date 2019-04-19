"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CatalogModel {
    constructor(id, categoryId, name, thumbnail, stars, newPrice, oldPrice, votes, discount) {
        this.id = 0;
        this.categoryId = 0;
        this.name = "";
        this.thumbnail = "";
        this.stars = 0;
        this.newPrice = 0;
        this.oldPrice = 0;
        this.votes = 0;
        this.discount = 0;
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.thumbnail = thumbnail;
        this.stars = stars;
        this.newPrice = newPrice;
        this.oldPrice = oldPrice;
        this.votes = votes;
        this.discount = discount;
    }
}
exports.CatalogModel = CatalogModel;
//# sourceMappingURL=model-catalog.js.map