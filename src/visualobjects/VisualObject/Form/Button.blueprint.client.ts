import { Blueprint } from "@ucsjs/blueprint";

export class ButtonVisualBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Button";
    private __group = "Visual Objects";
    private __headerIcon = "fa-regular fa-hand-pointer";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.event("click");
    }
}