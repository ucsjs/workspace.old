import { Blueprint, Type } from "@ucsjs/blueprint";

export class JSONBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON";
    private __group = "Common";

    public _document: object = {};

    constructor(metadata?: any){
        super();

        this.output("state", Type.JSON, null);

        if(typeof metadata.document == "object"){
            this._document = metadata.document;
            this.next("state", this._document);
        }
    }
}