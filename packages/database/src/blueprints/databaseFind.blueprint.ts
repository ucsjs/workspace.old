import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeDatabase } from "./databaseTypes.enum";

export class DatabaseFindBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Find";
    private __group = "Database";
    private __headerColor = "#d100c6";
    private __headerIcon = "fa-solid fa-database";
    private __TypeDatabase_Table: object = { color: "#750073" };

    public _limit: number = 10;
    public _offset: number = 0;
    public _groupBy: string = "";

    private state = { table: null, query: null };

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        if(metadata && metadata.query)
            this.state["query"] = metadata.query;
        
        this.input("schema", TypeDatabase.Table, null, async (table: Model<any>) => {
            if(table){
                Logger.log(`Recive table`, "DatabaseFindBlueprint");
                this.state["table"] = table;
                await this.run(this);
            }
        });

        this.input("query", Type.JSON, null, (query) => {
            if(query){
                Logger.log(`Recive query: ${JSON.stringify(query)}`, "DatabaseFindBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });

        this.output("result", Type.JSON, null);
        this.output("error", Type.String, null);
    }

    public async run(scope){
        if(scope.state.table && scope.state.query){
            Logger.log(`Find in Database: ${JSON.stringify(scope.state.query)}`, "DatabaseFindBlueprint");

            try{
                let $where = [];

                for(let key in scope.state.query){
                    $where.push(`t1.${key} = :${key}`);
                }

                let query = await scope.state.table
                    .createQueryBuilder('t1')
                    .where(scope.state.query)
                    .where($where.join(','), scope.state.query)
                    .limit(scope._limit)
                    .offset(scope._offset)

                if(scope._groupBy)
                    query.groupBy(scope._groupBy);

                let docs = query.getMany();
                scope.next("result", docs);
            }
            catch(e){
                Logger.error(e, "DatabaseFindBlueprint");
                scope.next("error", e.message);
            }
        }
    }
}