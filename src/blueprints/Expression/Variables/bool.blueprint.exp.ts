import { Blueprint, Type } from "@ucsjs/blueprint";

export class BoolExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Bool";
    private __group = "Variables";
    private __headerIcon = "fa-solid fa-pen";
    private __headerColor = "#8c0000";

    public _value: boolean = false;

    constructor(){
        super();
        this.output("result", Type.Boolean, null);
    }
}