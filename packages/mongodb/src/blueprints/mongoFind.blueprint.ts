import { Logger } from "@nestjs/common";
import { Schema, Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoFindBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Find";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBSchema: object = { color: "#419343" };

    public _limit: number = 10;
    public _offset: number = 0;

    private state = { model: null };

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("schema", TypeMongoDB.Schema, null, async (model: Model<any>) => {
            if(model){
                Logger.log(`Recive model`, "MongoFindBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });

        this.input("query", Type.JSON, null, async (query) => {
            if(query){
                Logger.log(`Recive query: ${JSON.stringify(query)}`, "MongoFindBlueprint");
                this.state["query"] = query;
                await this.run(this);
            }
        });

        this.output("result", Type.JSON, null);
        this.output("error", Type.Any, null);
    }

    public async run(scope){
        if(scope.state.model && scope.state.query){
            try{
                const docs = await scope.state.model.find(scope.state.query, null, {
                    limit: scope._limit,
                    skip: scope._offset
                }).lean();

                scope.next("result", docs);
            }
            catch(e){
                Logger.error(e, "MongoFindBlueprint");
                scope.next("error", e);
            }
        }
    }
}