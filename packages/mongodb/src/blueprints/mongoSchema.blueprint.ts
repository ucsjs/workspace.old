import { Logger } from "@nestjs/common";
import { Connection, model, Model } from "mongoose";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoSchemaBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Schema";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "./public/icons/mongodb.png";
    private __TypeMongoDBConnection: object = { color: "#419343" };
    private __TypeMongoDBSchema: object = { color: "#419343" };
    private __type = ["String", "Number", "Date", "Buffer", "Boolean", "Mixed", "ObjectId", "Array", "Decimal128", "Map", "Schema"];

    public _collection: string = "";
    public _timestamps: boolean = false;
    public _fields: object = {name: "string", type: "string", index: "boolean", unique: "boolean", required: "boolean", multi: true}; 

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("connection", Type.String, null, (connectionName: string) => {
            if(connectionName){
                const collectionClassName = this._collection.charAt(0).toUpperCase() + this._collection.slice(1).toLowerCase();
                
                if(this.root.hasOwnProperty(connectionName)){
                    Logger.log(`Recive connection: ${connectionName} load model ${collectionClassName}Model`, "MongoSchemaBlueprint");
                    this.next("schema", this.root[connectionName].model(`${collectionClassName}Model`, this.root[`${collectionClassName}Schema`]));
                }
            }
        });

        this.output("schema", TypeMongoDB.Schema, null);
    }
}