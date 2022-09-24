import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoExistsBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Exists";
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
                Logger.log(`Recive model`, "MongoExistsBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });

        this.input("query", Type.JSON, null, (query) => {
            if(query){
                Logger.log(`Recive query: ${JSON.stringify(query)}`, "MongoExistsBlueprint");
                this.state["query"] = query;
                this.run(this);
            }
        });

        this.output("result", Type.Boolean, null);
        this.output("error", Type.Any, null);
    }

    public async run(scope){
        if(scope.state.model && scope.state.query){
            Logger.log(`Exists in MongoDB: ${JSON.stringify(scope.state.query)}`, "MongoExistsBlueprint");

            try{
                const exists = await scope.state.model.exists(scope.state.query);
                scope.next("result", exists);
            }
            catch(e){
                Logger.error(e, "MongoExistsBlueprint");
                scope.next("error", e);
            }
        }
    }
}