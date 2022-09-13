import { BehaviorSubject } from 'rxjs';
import { Blueprint } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoConnectionBlueprint extends Blueprint{
    //Metadata
    private __namespace = "MongoDB: Conn";
    private __type = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";

    public _host: string = "localhost";
    public _port: number = 27017;
    public _user: string = "";
    public _pass: string = "";

    constructor(){
        super();
        this.output("connection", TypeMongoDB.Connection, null);
    }
}