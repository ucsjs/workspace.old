import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoConnectionBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Conn";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBConnection: object = { color: "#419343" };
    private __protocol = ["mongodb", "mongodb+srv"];
 
    public _protocol: string = "mongodb";
    public _host: string = "localhost";
    public _port: number = 27017;
    public _ignorePort: boolean = false;
    public _user: string = "";
    public _pass: string = "";
    public _db: string = "";
    public _replicaSet: string = "";
    public _tls: boolean = false;
    public _authSource: string = "admin";

    protected connectionName;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("connection", Type.String, null);
    }

    start(){
        console.log(this.connectionName);
        this.next("connection", this.connectionName);
    }
}