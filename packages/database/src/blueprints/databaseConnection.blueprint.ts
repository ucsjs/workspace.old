import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypeDatabase } from "./databaseTypes.enum";
import { createConnection, Connection } from "mongoose";

export class DbConnectionBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Conn";
    private __group = "Database";
    private __headerColor = "#d100c6";
    private __headerIcon = "fa-solid fa-database";
    private __TypeDatabase_Connection: object = { color: "#6b0099" };
 
    public _type: string = "mysql";
    public _host: string = "localhost";
    public _port: number = 27017;
    public _user: string = "";
    public _pass: string = "";
    public _db: string = "";
    public _synchronize: boolean = true;
    public _logging: boolean = true;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("connection", TypeDatabase.Connection, null);
    }

    start(){
        this.next("connection", `${this._type}_${this._itemKey}`);
    }
}