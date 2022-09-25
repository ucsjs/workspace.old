"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionBlueprint = void 0;
const blueprint_1 = require("@ucsjs/blueprint");
const databaseTypes_enum_1 = require("./databaseTypes.enum");
class DbConnectionBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Conn";
        this.__group = "Database";
        this.__headerColor = "#d100c6";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeDatabase_Connection = { color: "#6b0099" };
        this._type = "mysql";
        this._host = "localhost";
        this._port = 27017;
        this._user = "";
        this._pass = "";
        this._db = "";
        this._synchronize = true;
        this._logging = true;
        this.setup(metadata);
        this.output("connection", databaseTypes_enum_1.TypeDatabase.Connection, null);
    }
    start() {
        this.next("connection", `${this._type}_${this._itemKey}`);
    }
}
exports.DbConnectionBlueprint = DbConnectionBlueprint;
