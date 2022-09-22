"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUpdateBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoUpdateBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Update";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "./public/icons/mongodb.png";
        this.__TypeMongoDBSchema = { color: "#419343" };
        this._multi = false;
        this._upsert = false;
        this.state = { model: null, set: null, query: null };
        this.setup(metadata);
        this.input("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null, async (model) => {
            if (model) {
                common_1.Logger.log(`Recive model`, "MongoUpdateBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });
        this.input("set", blueprint_1.Type.JSON, null, async (set) => {
            if (set) {
                common_1.Logger.log(`Recive set ${JSON.stringify(set)}`, "MongoUpdateBlueprint");
                this.state["set"] = set;
                await this.run(this);
            }
        });
        this.input("query", blueprint_1.Type.JSON, null, async (query) => {
            if (query) {
                common_1.Logger.log(`Recive query ${JSON.stringify(query)}`, "MongoUpdateBlueprint");
                this.state["query"] = query;
                await this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.JSON, null);
        this.output("error", blueprint_1.Type.Any, null);
    }
    async run(scope) {
        if (scope.state.model && scope.state.set && scope.state.query) {
            common_1.Logger.log(`Update ${JSON.stringify(scope.state.query)} MongoDB: ${JSON.stringify(scope.state.set)}`, "MongoUpdateBlueprint");
            try {
                let result = null;
                if (scope._multi)
                    result = await scope.state.model.updateMany(scope.state.query, { $set: scope.state.set }, { upsert: scope._upsert });
                else
                    result = await scope.state.model.updateOne(scope.state.query, { $set: scope.state.set }, { upsert: scope._upsert });
                scope.next("result", result);
            }
            catch (e) {
                common_1.Logger.error(e, "MongoUpdateBlueprint");
                scope.next("error", e);
            }
        }
    }
}
exports.MongoUpdateBlueprint = MongoUpdateBlueprint;
