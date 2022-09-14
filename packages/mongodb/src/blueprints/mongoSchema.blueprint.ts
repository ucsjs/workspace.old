import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoSchemaBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Schema";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "fa-solid fa-database";
    private __TypeMongoDBConnection: object = { color: "#419343" };
    private __TypeMongoDBSchema: object = { color: "#419343" };
    private __type = ["String", "Number", "Date", "Buffer", "Boolean", "Mixed", "ObjectId", "Array", "Decimal128", "Map", "Schema"];

    public _collection: string = "";
    public _timestamps: boolean = false;
    public _fields: object = {name: "string", type: "string", index: "boolean", unique: "boolean", required: "boolean", multi: true}; 

    private connectionName = "";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("connection", Type.String, null, (v) => {
            this.connectionName = v;
            Logger.log(`Recive connection: ${v}`, "MongoSchemaBlueprint")
            //this.next("schema", )
        });

        this.output("schema", TypeMongoDB.Schema, null);
    }
}