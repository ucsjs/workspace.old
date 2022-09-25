"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoExistsBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoExistsBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Exists";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "./public/icons/mongodb.png";
        this.__TypeMongoDB_Schema = { color: "#6d0000" };
        this.state = { model: null, query: null };
        this.setup(metadata);
        if (metadata && metadata.query)
            this.state["query"] = metadata.query;
        this.input("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null, async (model) => {
            if (model) {
                common_1.Logger.log(`Recive model`, "MongoExistsBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });
        this.input("query", blueprint_1.Type.JSON, null, (query) => {
            if (query) {
                common_1.Logger.log(`Recive query: ${JSON.stringify(query)}`, "MongoExistsBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.Boolean, null);
    }
    async run(scope) {
        if (scope.state.model && scope.state.query) {
            common_1.Logger.log(`Exists in MongoDB: ${JSON.stringify(scope.state.query)}`, "MongoExistsBlueprint");
            try {
                const exists = await scope.state.model.exists(scope.state.query).lean();
                scope.next("result", (typeof exists == "object" && exists !== null));
            }
            catch (e) {
                scope.next("result", false);
            }
        }
    }
}
exports.MongoExistsBlueprint = MongoExistsBlueprint;
