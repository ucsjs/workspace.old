import { Logger } from "@nestjs/common";
import { Blueprint } from "@ucsjs/blueprint";
import { TypeDatabase } from "./databaseTypes.enum";

export class DatabaseTableBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Table";
    private __group = "Database";
    private __headerColor = "#d100c6";
    private __headerIcon = "fa-solid fa-database";
    private __TypeDatabase_Connection: object = { color: "#6b0099" };
    private __TypeDatabase_Table: object = { color: "#750073" };
    private __type = ["String", "Number", "Date", "Buffer", "Boolean", "Mixed", "ObjectId", "Array", "Decimal128", "Map", "Schema"];

    public _table: string = "";
    public _columns: object = {name: "string", type: "string", primary: "boolean", index: "boolean", unique: "boolean", nullable: "boolean", multi: true}; 
    public _indices: object = {name: "string", unique: "boolean", columns: "object", multi: true}; 
    public _uniques: object = {name: "string", columns: "object", multi: true}; 

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("connection", TypeDatabase.Connection, null, (connectionName: string) => {
            if(connectionName){
                const collectionClassName = this._table.charAt(0).toUpperCase() + this._table.slice(1).toLowerCase();
                
                if(this.root.hasOwnProperty(connectionName)){
                    Logger.log(`Recive connection: ${connectionName} load entity ${collectionClassName}Entity`, "DatabaseSchemaBlueprint");
                    const repository = this.root[connectionName]?.getRepository(this.root[`${collectionClassName}Entity`]);
                    this.next("table", repository);
                }
            }
        });

        this.output("table", TypeDatabase.Table, null);
    }
}