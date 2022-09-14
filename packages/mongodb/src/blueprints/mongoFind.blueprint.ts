import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoFindBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Find";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBSchema: object = { color: "#419343" };

    public _collection: string = "";
    public _limit: number = 10;
    public _offset: number = 0;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("connection", TypeMongoDB.Schema, null);
        this.input("query", Type.JSON, null);
        this.output("result", Type.JSON, null);
        this.output("error", Type.Any, null);
    }
}