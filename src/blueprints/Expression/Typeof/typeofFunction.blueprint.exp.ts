import { Blueprint, Type } from "@ucsjs/blueprint";

export class TypeofFunctionExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Typeof Function";
    private __group = "Typeof";
    private __headerIcon = "fa-solid fa-check";
    private __headerColor = "#006601";

    constructor(){
        super();
        this.input("value", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}