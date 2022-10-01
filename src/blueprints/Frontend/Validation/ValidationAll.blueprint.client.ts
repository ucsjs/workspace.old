import { Blueprint, Type } from "@ucsjs/blueprint";

export class ValidationAllClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Validation";
    private __group = "Validation";
    private __headerIcon = "fa-solid fa-check-double";
    private __headerColor = "#e55e1b";
    private __trigger = true;

    public _items: number = 0;

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("True");
        this.event("False");

        this.output("True", Type.Boolean, null);
        this.output("False", Type.Boolean, null);
    }
}