"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFindBlueprint = void 0;
const common_1 = require("@nestjs/common");
const blueprint_1 = require("@ucsjs/blueprint");
const databaseTypes_enum_1 = require("./databaseTypes.enum");
class DatabaseFindBlueprint extends blueprint_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Find";
        this.__group = "Database";
        this.__headerColor = "#d100c6";
        this.__headerIcon = "fa-solid fa-database";
        this.__TypeDatabase_Table = { color: "#750073" };
        this._limit = 10;
        this._offset = 0;
        this._groupBy = "";
        this.state = { table: null, query: null };
        this.setup(metadata);
        if (metadata && metadata.query)
            this.state["query"] = metadata.query;
        this.input("schema", databaseTypes_enum_1.TypeDatabase.Table, null, async (table) => {
            if (table) {
                common_1.Logger.log(`Recive table`, "DatabaseFindBlueprint");
                this.state["table"] = table;
                await this.run(this);
            }
        });
        this.input("query", blueprint_1.Type.JSON, null, (query) => {
            if (query) {
                common_1.Logger.log(`Recive query: ${JSON.stringify(query)}`, "DatabaseFindBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });
        this.output("result", blueprint_1.Type.JSON, null);
        this.output("error", blueprint_1.Type.String, null);
    }
    async run(scope) {
        if (scope.state.table && scope.state.query) {
            common_1.Logger.log(`Find in Database: ${JSON.stringify(scope.state.query)}`, "DatabaseFindBlueprint");
            try {
                let $where = [];
                for (let key in scope.state.query) {
                    $where.push(`t1.${key} = :${key}`);
                }
                let query = await scope.state.table
                    .createQueryBuilder('t1')
                    .where(scope.state.query)
                    .where($where.join(','), scope.state.query)
                    .limit(scope._limit)
                    .offset(scope._offset);
                if (scope._groupBy)
                    query.groupBy(scope._groupBy);
                let docs = query.getMany();
                scope.next("result", docs);
            }
            catch (e) {
                common_1.Logger.error(e, "DatabaseFindBlueprint");
                scope.next("error", e.message);
            }
        }
    }
}
exports.DatabaseFindBlueprint = DatabaseFindBlueprint;
