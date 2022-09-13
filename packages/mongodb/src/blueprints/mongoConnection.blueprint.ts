import { Blueprint } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoConnectionBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Conn";
    private __type = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBConnection: object = { color: "#419343" };

    public _host: string = "localhost";
    public _port: number = 27017;
    public _user: string = "";
    public _pass: string = "";
    public _db: string = "";

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("connection", TypeMongoDB.Connection, null);
    }
}