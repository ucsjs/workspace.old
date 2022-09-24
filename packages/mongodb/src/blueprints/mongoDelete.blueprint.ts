import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoDeleteBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Delete";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "./public/icons/mongodb.png";
    private __TypeMongoDB_Schema: object = { color: "#6d0000" };

    public _multi: boolean = false;

    private state = { model: null, query: null };

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        
        this.input("schema", TypeMongoDB.Schema, null, async (model: Model<any>) => {
            if(model){
                Logger.log(`Recive model`, "MongoDeleteBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });

        this.input("query", Type.JSON, null, async (query: object) => {
            if(query){
                Logger.log(`Recive query ${JSON.stringify(query)}`, "MongoDeleteBlueprint");
                this.state["query"] = query;
                await this.run(this);
            }
        });

        this.output("result", Type.JSON, null);
        this.output("error", Type.Any, null);
    }

    public async run(scope){
        if(scope.state.model && scope.state.query){
            Logger.log(`Delete ${JSON.stringify(scope.state.query)} MongoDB`, "MongoDeleteBlueprint");

            try{
                let result = null;

                if(scope._multi)
                    result = await scope.state.model.deleteMany(scope.state.query);
                else 
                    result = await scope.state.model.deleteOne(scope.state.query);

                scope.next("result", result);
            }
            catch(e){
                Logger.error(e, "MongoDeleteBlueprint");
                scope.next("error", e);
            }
        }
    }
}