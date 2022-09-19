"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDeleteBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoDeleteBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Delete";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeMongoDBSchema = { color: "#419343" };
        this._multi = false;
        this.state = { model: null, query: null };
        this.setup(metadata);
        this.input("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null, async (model) => {
            if (model) {
                common_1.Logger.log(`Recive model`, "MongoDeleteBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });
        this.input("query", blueprint_1.Type.JSON, null, async (query) => {
            if (query) {
                common_1.Logger.log(`Recive query ${JSON.stringify(query)}`, "MongoDeleteBlueprint");
                this.state["query"] = query;
                await this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.JSON, null);
        this.output("error", blueprint_1.Type.Any, null);
    }
    async run(scope) {
        if (scope.state.model && scope.state.query) {
            common_1.Logger.log(`Delete ${JSON.stringify(scope.state.query)} MongoDB`, "MongoDeleteBlueprint");
            try {
                let result = null;
                if (scope._multi)
                    result = await scope.state.model.deleteMany(scope.state.query);
                else
                    result = await scope.state.model.deleteOne(scope.state.query);
                scope.next("result", result);
            }
            catch (e) {
                common_1.Logger.error(e, "MongoDeleteBlueprint");
                scope.next("error", e);
            }
        }
    }
}
exports.MongoDeleteBlueprint = MongoDeleteBlueprint;
