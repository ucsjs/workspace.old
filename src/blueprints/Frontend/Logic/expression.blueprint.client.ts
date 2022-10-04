import { Blueprint, Type } from "@ucsjs/blueprint";

export class ExpressionClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Expression";
    private __group = "Logic";
    private __headerColor = "#4c4c4c";
    private __headerIcon = "fa-solid fa-diagram-project";
    private __expression = true;
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("intput", Type.JSON, null);
        this.output("output", Type.Boolean, null);
    }
}