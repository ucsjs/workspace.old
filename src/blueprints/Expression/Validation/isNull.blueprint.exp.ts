import { Blueprint, Type } from "@ucsjs/blueprint";

export class IsNullExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "IsNull";
    private __group = "Validation";
    private __headerColor = "#00706c";

    constructor(){
        super();
        this.input("value", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}