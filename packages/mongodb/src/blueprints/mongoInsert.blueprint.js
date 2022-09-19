"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoInsertBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const mongoTypes_enum_1 = require("./mongoTypes.enum");
class MongoInsertBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Insert";
        this.__group = "MongoDB";
        this.__headerColor = "#419343";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeMongoDBSchema = { color: "#419343" };
        this.state = { model: null, document: null };
        this.setup(metadata);
        this.input("schema", mongoTypes_enum_1.TypeMongoDB.Schema, null, async (model) => {
            if (model) {
                common_1.Logger.log(`Recive model`, "MongoInsertBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });
        this.input("document", blueprint_1.Type.JSON, null, (document) => {
            if (document) {
                common_1.Logger.log(`Recive query: ${JSON.stringify(document)}`, "MongoInsertBlueprint");
                this.state["document"] = document;
                this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.Any, null);
        this.output("error", blueprint_1.Type.Any, null);
    }
    async run(scope) {
        if (scope.state.model && scope.state.document) {
            common_1.Logger.log(`Insert into MongoDB: ${JSON.stringify(scope.state.document)}`, "MongoInsertBlueprint");
            try {
                const doc = new scope.state.model(scope.state.document);
                const result = await doc.save();
                scope.next("result", result);
            }
            catch (e) {
                common_1.Logger.error(e, "MongoInsertBlueprint");
                scope.next("error", e);
            }
        }
    }
}
exports.MongoInsertBlueprint = MongoInsertBlueprint;
