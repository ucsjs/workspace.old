"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTableBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const databaseTypes_enum_1 = require("./databaseTypes.enum");
class DatabaseTableBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Table";
        this.__group = "Database";
        this.__headerColor = "#d100c6";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeDatabase_Connection = { color: "#6b0099" };
        this.__TypeDatabase_Table = { color: "#750073" };
        this.__type = ["String", "Number", "Date", "Buffer", "Boolean", "Mixed", "ObjectId", "Array", "Decimal128", "Map", "Schema"];
        this._table = "";
        this._columns = { name: "string", type: "string", primary: "boolean", index: "boolean", unique: "boolean", nullable: "boolean", multi: true };
        this._indices = { name: "string", unique: "boolean", columns: "object", multi: true };
        this._uniques = { name: "string", columns: "object", multi: true };
        this.setup(metadata);
        this.input("connection", databaseTypes_enum_1.TypeDatabase.Connection, null, (connectionName) => {
            var _a;
            if (connectionName) {
                const collectionClassName = this._table.charAt(0).toUpperCase() + this._table.slice(1).toLowerCase();
                if (this.root.hasOwnProperty(connectionName)) {
                    common_1.Logger.log(`Recive connection: ${connectionName} load entity ${collectionClassName}Entity`, "DatabaseSchemaBlueprint");
                    const repository = (_a = this.root[connectionName]) === null || _a === void 0 ? void 0 : _a.getRepository(this.root[`${collectionClassName}Entity`]);
                    this.next("table", repository);
                }
            }
        });
        this.output("table", databaseTypes_enum_1.TypeDatabase.Table, null);
    }
}
exports.DatabaseTableBlueprint = DatabaseTableBlueprint;
