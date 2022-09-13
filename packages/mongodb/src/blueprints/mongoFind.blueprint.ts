import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoFindBlueprint extends Blueprint{
    //Metadata
    private __namespace = "MongoDB: Find";
    private __type = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";

    constructor(){
        super();
        this.input("connection", TypeMongoDB.Connection, null);
    }
}