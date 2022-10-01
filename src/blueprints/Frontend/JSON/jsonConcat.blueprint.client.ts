import { Blueprint, Type } from "@ucsjs/blueprint";

export class JSONConcatClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Concat";
    private __group = "JSON";
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("JSON1", Type.JSON, null);
        this.input("JSON2", Type.JSON, null);
        this.output("result", Type.JSON, null);       
    }
}