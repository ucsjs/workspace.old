import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoUpdateBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Update";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBSchema: object = { color: "#419343" };

    public _collection: string = "";
    public _multi: boolean = false;
    public _upsert: boolean = false;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("connection", TypeMongoDB.Schema, null);
        this.input("query", Type.JSON, null);
        this.input("document", Type.JSON, null);
        this.output("result", Type.JSON, null);
        this.output("error", Type.Any, null);
    }
}