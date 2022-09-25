"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInsertBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const databaseTypes_enum_1 = require("./databaseTypes.enum");
class DatabaseInsertBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Insert";
        this.__group = "Database";
        this.__headerColor = "#d100c6";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeDatabase_Table = { color: "#750073" };
        this.state = { table: null, document: null };
        this.input("schema", databaseTypes_enum_1.TypeDatabase.Table, null, async (table) => {
            if (table) {
                common_1.Logger.log(`Recive table`, "DatabaseInsertBlueprint");
                this.state["table"] = table;
                await this.run(this);
            }
        });
        this.input("document", blueprint_1.Type.JSON, null, (document) => {
            if (document) {
                common_1.Logger.log(`Recive query: ${JSON.stringify(document)}`, "DatabaseInsertBlueprint");
                this.state["document"] = document;
                this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.JSON, null);
        this.output("error", blueprint_1.Type.String, null);
    }
    async run(scope) {
        if (scope.state.table && scope.state.document) {
            common_1.Logger.log(`Insert into Database: ${JSON.stringify(scope.state.document)}`, "DatabaseInsertBlueprint");
            try {
                let result = await scope.state.table
                    .createQueryBuilder()
                    .insert()
                    .into(scope.state.document)
                    .execute();
                scope.next("result", result);
            }
            catch (e) {
                common_1.Logger.error(e, "DatabaseInsertBlueprint");
                scope.next("error", e.message);
            }
        }
    }
}
exports.DatabaseInsertBlueprint = DatabaseInsertBlueprint;
