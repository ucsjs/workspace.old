"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoFindBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoFindBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Find";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "./public/icons/mongodb.png";
        this.__TypeMongoDBSchema = { color: "#419343" };
        this._limit = 10;
        this._offset = 0;
        this.state = { model: null, query: null };
        this.setup(metadata);
        if (metadata && metadata.query)
            this.state["query"] = metadata.query;
        this.input("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null, async (model) => {
            if (model) {
                common_1.Logger.log(`Recive model`, "MongoFindBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });
        this.input("query", blueprint_1.Type.JSON, null, (query) => {
            if (query) {
                common_1.Logger.log(`Recive query: ${JSON.stringify(query)}`, "MongoFindBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.JSON, null);
        this.output("error", blueprint_1.Type.Any, null);
    }
    async run(scope) {
        if (scope.state.model && scope.state.query) {
            common_1.Logger.log(`Find in MongoDB: ${JSON.stringify(scope.state.query)}`, "MongoFindBlueprint");
            try {
                const docs = await scope.state.model.find(scope.state.query, null, {
                    limit: scope._limit,
                    skip: scope._offset
                }).lean();
                scope.next("result", docs);
            }
            catch (e) {
                common_1.Logger.error(e, "MongoFindBlueprint");
                scope.next("error", e);
            }
        }
    }
}
exports.MongoFindBlueprint = MongoFindBlueprint;
