"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoFindBlueprint = void 0;
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoFindBlueprint extends blueprint_1.Blueprint {
    constructor() {
        super();
        this.__namespace = "MongoDB: Find";
        this.__type = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "fa-solid fa-database";
        this.input("connection", mongoTypes_enum_1.TypeMongoDB.Connection, null);
    }
}
exports.MongoFindBlueprint = MongoFindBlueprint;
