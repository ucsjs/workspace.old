import { Blueprint, Type } from "@ucsjs/blueprint";

export class InputVisualBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Input";
    private __group = "Visual Objects";
    private __headerIcon = "fa-solid fa-i-cursor";
    private __headerColor = "#630000";
    private __componentLink = "InputVisual";

    public _name: string = "";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("value", Type.String, null);
    }
}