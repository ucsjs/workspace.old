"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnectionBlueprint = void 0;
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoConnectionBlueprint extends blueprint_1.Blueprint {
    constructor() {
        super();
        this.__namespace = "MongoDB: Conn";
        this.__type = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "fa-solid fa-database";
        this._host = "localhost";
        this._port = 27017;
        this._user = "";
        this._pass = "";
        this.output("connection", mongoTypes_enum_1.TypeMongoDB.Connection, null);
    }
}
exports.MongoConnectionBlueprint = MongoConnectionBlueprint;
