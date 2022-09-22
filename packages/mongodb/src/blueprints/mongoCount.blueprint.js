"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCountBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoCountBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Count";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "./public/icons/mongodb.png";
        this.__TypeMongoDBSchema = { color: "#419343" };
        this.state = { model: null, query: null };
        this.setup(metadata);
        if (metadata && metadata.query)
            this.state["query"] = metadata.query;
        this.input("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null, async (model) => {
            if (model) {
                common_1.Logger.log(`Recive model`, "MongoCountBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });
        this.input("query", blueprint_1.Type.JSON, null, (query) => {
            if (query) {
                common_1.Logger.log(`Recive query: ${JSON.stringify(query)}`, "MongoCountBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.Int, null);
        this.output("error", blueprint_1.Type.Any, null);
    }
    async run(scope) {
        if (scope.state.model && scope.state.query) {
            common_1.Logger.log(`Count in MongoDB: ${JSON.stringify(scope.state.query)}`, "MongoCountBlueprint");
            try {
                const docsCount = await scope.state.model.count(scope.state.query);
                scope.next("result", docsCount);
            }
            catch (e) {
                common_1.Logger.error(e, "MongoCountBlueprint");
                scope.next("error", e);
            }
        }
    }
}
exports.MongoCountBlueprint = MongoCountBlueprint;
