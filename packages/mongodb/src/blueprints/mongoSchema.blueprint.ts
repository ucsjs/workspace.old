import { Logger } from "@nestjs/common";
import { Blueprint } from "@ucsjs/blueprint";
import { TypeMongoDB } from "./mongoTypes.enum";

export class MongoSchemaBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Schema";
    private __group = "MongoDB";
    private __headerColor = "#419343";
    private __headerIcon = "./public/icons/mongodb.png";
    private __TypeMongoDB_Connection: object = { color: "#419343" };
    private __TypeMongoDB_Schema: object = { color: "#6d0000" };
    private __type = ["String", "Number", "Date", "Buffer", "Boolean", "Mixed", "ObjectId", "Array", "Decimal128", "Map", "Schema"];

    public _collection: string = "";
    public _timestamps: boolean = false;
    public _fields: object = {name: "string", type: "string", index: "boolean", unique: "boolean", required: "boolean", multi: true}; 

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("connection", TypeMongoDB.Connection, null, (connectionName) => {
            if(connectionName){      
                if(typeof connectionName == "string"){
                    const collectionClassName = this._collection.charAt(0).toUpperCase() + this._collection.slice(1).toLowerCase();
                    
                    if(this.root.hasOwnProperty(connectionName)){
                        Logger.log(`Recive connection: ${connectionName} load model ${collectionClassName}Document`, "MongoSchemaBlueprint");
                        this.next("schema", this.root[connectionName].model(`${collectionClassName}Document`, this.root[`${collectionClassName}Schema`]));
                    }
                    else {
                        Logger.error(`Recive connection: ${connectionName} not found`, "MongoSchemaBlueprint");
                    }
                }
                else if(typeof connectionName == "object" && connectionName !== null){
                    const collectionClassName = this._collection.charAt(0).toUpperCase() + this._collection.slice(1).toLowerCase();
     
                    if(this[`${collectionClassName}Schema`]){
                        Logger.log(`Recive connection: Load model ${collectionClassName}Document from this`, "MongoSchemaBlueprint");
                        this.next("schema", connectionName.model(`${collectionClassName}Document`, this[`${collectionClassName}Schema`]));
                    }
                    if(this.root){
                        if(this.root[`${collectionClassName}Schema`]){
                            Logger.log(`Recive connection: Load model ${collectionClassName}Document from root`, "MongoSchemaBlueprint");
                            this.next("schema", connectionName.model(`${collectionClassName}Document`, this.root[`${collectionClassName}Schema`]));
                        }
                        else {
                            console.log(this.root);
                            Logger.error(`Recive connection: Schema not exists ${collectionClassName}`, "MongoSchemaBlueprint");
                        }
                    }              
                }
                else{
                    Logger.error(`Recive connection: ${connectionName} not found`, "MongoSchemaBlueprint");
                }
            }
        });

        this.output("schema", TypeMongoDB.Schema, null);
    }
}