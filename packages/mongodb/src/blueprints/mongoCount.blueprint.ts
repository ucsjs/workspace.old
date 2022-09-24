import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoCountBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Count";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "./public/icons/mongodb.png";
    private __TypeMongoDB_Schema: object = { color: "#6d0000" };

    private state = { model: null, query: null };

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        if(metadata && metadata.query)
            this.state["query"] = metadata.query;
        
        this.input("schema", TypeMongoDB.Schema, null, async (model: Model<any>) => {
            if(model){
                Logger.log(`Recive model`, "MongoCountBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });

        this.input("query", Type.JSON, null, (query) => {
            if(query){
                Logger.log(`Recive query: ${JSON.stringify(query)}`, "MongoCountBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });

        this.output("result", Type.Int, null);
        this.output("error", Type.Any, null);
    }

    public async run(scope){
        if(scope.state.model && scope.state.query){
            Logger.log(`Count in MongoDB: ${JSON.stringify(scope.state.query)}`, "MongoCountBlueprint");

            try{
                const docsCount = await scope.state.model.count(scope.state.query);
                scope.next("result", docsCount);
            }
            catch(e){
                Logger.error(e, "MongoCountBlueprint");
                scope.next("error", e);
            }
        }
    }
}