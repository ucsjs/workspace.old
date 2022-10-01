import { Blueprint, Type } from "@ucsjs/blueprint";

export class JSONGetClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Get";
    private __group = "JSON";
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("JSON", Type.JSON, null);
        this.output("result", Type.Any, null);
    }
}