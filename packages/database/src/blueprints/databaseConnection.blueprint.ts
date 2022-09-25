import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeDatabase } from "./databaseTypes.enum";
import { createConnection, Connection } from "mongoose";

export class DbConnectionBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Conn";
    private __group = "Database";
    private __headerColor = "#002a7f";
    private __headerIcon = "fa-solid fa-database";
    private __TypeDatabase_Connection: object = { color: "#419343" };
 
    public _type: string = "mysql";
    public _host: string = "localhost";
    public _port: number = 27017;
    public _ignorePort: boolean = false;
    public _user: string = "";
    public _pass: string = "";
    public _db: string = "";

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("connection", TypeDatabase.Connection, null);
    }

    start(){
        this.next("connection", `${this._type}_${this._itemKey}`);
    }
}