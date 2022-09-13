import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoInsertBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Insert";
    private __type = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBConnection: object = { color: "#419343" };

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("connection", TypeMongoDB.Connection, null);
        this.input("document", Type.JSON, null);
        this.output("result", Type.Any, null);
        this.output("error", Type.Any, null);
    }
}