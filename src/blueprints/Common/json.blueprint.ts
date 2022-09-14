import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";

export class JSONBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON";
    private __group = "Common";

    public _document: object = {};

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("state", Type.JSON, null);       
    }

    start(){
        if(typeof this._document == "object"){
            Logger.log(`Send JSON: ${JSON.stringify(this._document)}`, "JSONBlueprint");
            this.next("state", this._document);
        }
    }
}