import { Blueprint, Type } from "@ucsjs/blueprint";

export class JSONItemClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Item";
    private __group = "JSON";
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    public _key: string = "";
   
    constructor(metadata?: any){
        super();
        this.input("value", Type.Any, null);
        this.output("result", Type.JSON, null);
    }
}