import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeDatabase } from "./databaseTypes.enum";

export class DatabaseInsertBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Insert";
    private __group = "Database";
    private __headerColor = "#d100c6";
    private __headerIcon = "fa-solid fa-database";
    private __TypeDatabase_Table: object = { color: "#750073" };

    public _limit: number = 10;
    public _offset: number = 0;
    public _groupBy: string = "";

    private state = { table: null, document: null };

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        if(metadata && metadata.query)
            this.state["query"] = metadata.query;
        
        this.input("schema", TypeDatabase.Table, null, async (table: Model<any>) => {
            if(table){
                Logger.log(`Recive table`, "DatabaseInsertBlueprint");
                this.state["table"] = table;
                await this.run(this);
            }
        });

        this.input("document", Type.JSON, null, (document) => {
            if(document){
                Logger.log(`Recive query: ${JSON.stringify(document)}`, "DatabaseInsertBlueprint");
                this.state["document"] = document;
                this.run(this);
            }
        });

        this.output("result", Type.JSON, null);
        this.output("error", Type.String, null);
    }

    public async run(scope){
        if(scope.state.table && scope.state.document){
            Logger.log(`Insert into Database: ${JSON.stringify(scope.state.document)}`, "DatabaseInsertBlueprint");

            try{
                let result = await scope.state.table
                    .createQueryBuilder()
                    .insert()
                    .into(scope.state.document)
                    .execute()
                
                scope.next("result", result);
            }
            catch(e){
                Logger.error(e, "DatabaseInsertBlueprint");
                scope.next("error", e.message);
            }
        }
    }
}