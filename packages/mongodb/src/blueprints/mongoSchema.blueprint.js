"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSchemaBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoSchemaBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Schema";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeMongoDBConnection = { color: "#419343" };
        this.__TypeMongoDBSchema = { color: "#419343" };
        this.__type = ["String", "Number", "Date", "Buffer", "Boolean", "Mixed", "ObjectId", "Array", "Decimal128", "Map", "Schema"];
        this._collection = "";
        this._timestamps = false;
        this._fields = { name: "string", type: "string", index: "boolean", unique: "boolean", required: "boolean", multi: true };
        this.setup(metadata);
        this.input("connection", blueprint_1.Type.String, null, (connectionName) => {
            if (connectionName) {
                const collectionClassName = this._collection.charAt(0).toUpperCase() + this._collection.slice(1).toLowerCase();
                if (this.root.hasOwnProperty(connectionName)) {
                    common_1.Logger.log(`Recive connection: ${connectionName} load model ${collectionClassName}Model`, "MongoSchemaBlueprint");
                    this.next("schema", this.root[connectionName].model(`${collectionClassName}Model`, this.root[`${collectionClassName}Schema`]));
                }
            }
        });
        this.output("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null);
    }
}
exports.MongoSchemaBlueprint = MongoSchemaBlueprint;
