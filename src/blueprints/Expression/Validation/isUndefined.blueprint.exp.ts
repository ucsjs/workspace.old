import { Blueprint, Type } from "@ucsjs/blueprint";

export class IsUndefinedExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "IsUndefined";
    private __group = "Validation";
    private __headerColor = "#00706c";

    constructor(){
        super();
        this.input("value", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}