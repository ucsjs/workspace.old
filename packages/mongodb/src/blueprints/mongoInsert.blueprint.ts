import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoInsertBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Insert";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "./public/icons/mongodb.png";
    private __TypeMongoDB_Schema: object = { color: "#6d0000" };
    private __trigger = true;

    private state = { model: null, document: null, conditional: false };

    public _awaitTrigger: boolean = false;

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("conditional", Type.Boolean, false, async (conditional: boolean) => {
            if(conditional !== undefined && typeof conditional === "boolean"){
                this.state["conditional"] = conditional;
                await this.run(this);
            }
        });

        this.input("schema", TypeMongoDB.Schema, null, async (model: Model<any>) => {
            if(model){
                Logger.log(`Recive model`, "MongoInsertBlueprint");
                this.state["model"] = model;
                await this.run(this);
            }
        });

        this.input("document", Type.JSON, null, (document) => {
            if(document){
                Logger.log(`Recive query: ${JSON.stringify(document)}`, "MongoInsertBlueprint");
                this.state["document"] = document;
                this.run(this);
            }
        });

        this.output("result", Type.Any, null);
        this.output("error", Type.String, null);
    }

    public async trigger(scope){
        scope._awaitTrigger = false;
        await scope.run(scope);
    }

    public async run(scope){
        if(scope.state.model && scope.state.document && !scope._awaitTrigger && scope.state.conditional === true){
            Logger.log(`Insert into MongoDB: ${JSON.stringify(scope.state.document)}`, "MongoInsertBlueprint");

            try{
                const doc = new scope.state.model(scope.state.document);
                const result = await doc.save();
                scope.next("result", result);
            }
            catch(e){
                Logger.error(e, "MongoInsertBlueprint");
                scope.next("error", e.message);
            }
        }
    }
}