import { Blueprint, Type } from "@ucsjs/blueprint";

export class NotEmptyClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "NotEmpty";
    private __group = "Validation";
    private __headerIcon = "fa-solid fa-check-double";
    private __headerColor = "#e55e1b";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("True");
        this.event("False");

        this.input("input", Type.Any, null);
    }
}