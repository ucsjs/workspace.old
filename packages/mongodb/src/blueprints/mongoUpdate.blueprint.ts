import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoUpdateBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Update";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "./public/icons/mongodb.png";
    private __TypeMongoDB_Schema: object = { color: "#6d0000" };
    private __trigger = true;

    public _awaitTrigger: boolean = true;
    public _multi: boolean = false;
    public _upsert: boolean = false;

    private state = { model: null, set: null, query: null };

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("schema", TypeMongoDB.Schema, null, async (model: Model<any>) => {
            if(model){
                Logger.log(`Recive model`, "MongoUpdateBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });

        this.input("set", Type.JSON, null, async (set: object) => {
            if(set){
                Logger.log(`Recive set ${JSON.stringify(set)}`, "MongoUpdateBlueprint");
                this.state["set"] = set;
                await this.run(this);
            }
        });

        this.input("query", Type.JSON, null, async (query: object) => {
            if(query){
                Logger.log(`Recive query ${JSON.stringify(query)}`, "MongoUpdateBlueprint");
                this.state["query"] = query;
                await this.run(this);
            }
        });

        this.output("result", Type.JSON, null);
        this.output("error", Type.String, null);
    }

    public async trigger(){
        Logger.log(`Triggered`, "MongoUpdateBlueprint");
        this._awaitTrigger = false;
        await this.run(this);
    }

    public async run(scope){
        if(scope.state.model && scope.state.set && scope.state.query && !scope._awaitTrigger){
            Logger.log(`Update ${JSON.stringify(scope.state.query)} MongoDB: ${JSON.stringify(scope.state.set)}`, "MongoUpdateBlueprint");

            try{
                let result = null;

                if(scope._multi)
                    result = await scope.state.model.updateMany(scope.state.query, {$set: scope.state.set}, {upsert: scope._upsert});
                else 
                    result = await scope.state.model.updateOne(scope.state.query, {$set: scope.state.set}, {upsert: scope._upsert});

                scope.next("result", result);
            }
            catch(e){
                Logger.error(e, "MongoUpdateBlueprint");
                scope.next("error", e.message);
            }
        }
    }
}