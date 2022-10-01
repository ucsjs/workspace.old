import { Blueprint, Type } from "@ucsjs/blueprint";

export class NotClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Not";
    private __group = "Logic";
    private __headerColor = "#4c4c4c";
    private __headerIcon = "fa-solid fa-exclamation";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("intput", Type.Boolean, null);
        this.output("output", Type.Boolean, null);
    }
}