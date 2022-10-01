import { Blueprint, Type } from "@ucsjs/blueprint";

export class ButtonVisualBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Button";
    private __group = "Visual Objects";
    private __headerIcon = "fa-regular fa-hand-pointer";
    private __headerColor = "#630000";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("disabled", Type.Boolean, true);
        this.event("click");
    }
}