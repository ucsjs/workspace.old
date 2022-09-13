import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoDeleteBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Delete";
    private __type = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBConnection: object = { color: "#419343" };

    public _collection: string = "";
    public _multi: boolean = false;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("connection", TypeMongoDB.Connection, null);
        this.input("query", Type.JSON, null);
        this.output("result", Type.JSON, null);
        this.output("error", Type.Any, null);
    }
}