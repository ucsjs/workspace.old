"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnectionBlueprint = void 0;
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoConnectionBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Conn";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "./public/icons/mongodb.png";
        this.__TypeMongoDBConnection = { color: "#419343" };
        this.__protocol = ["mongodb", "mongodb+srv"];
        this._protocol = "mongodb";
        this._host = "localhost";
        this._port = 27017;
        this._ignorePort = false;
        this._user = "";
        this._pass = "";
        this._db = "";
        this._replicaSet = "";
        this._tls = false;
        this._authSource = "admin";
        this.setup(metadata);
        this.output("connection", mongoTypes_enum_1.TypeMongoDB.Connection, null);
    }
    start() {
        this.next("connection", `mongodb_${this._itemKey}`);
    }
}
exports.MongoConnectionBlueprint = MongoConnectionBlueprint;
