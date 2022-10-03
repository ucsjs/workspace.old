import { Blueprint, Type } from "@ucsjs/blueprint";

export class IsEmptyClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Is Empty";
    private __group = "Validation";
    private __headerIcon = "fa-solid fa-check-double";
    private __headerColor = "#e55e1b";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("true");
        this.event("false");

        this.input("input", Type.Any, null);
    }
}