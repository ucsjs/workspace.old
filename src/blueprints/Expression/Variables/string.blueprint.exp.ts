import { Blueprint, Type } from "@ucsjs/blueprint";

export class StrExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "String";
    private __group = "Variables";
    private __headerIcon = "fa-solid fa-pen";
    private __headerColor = "#8c0000";

    public _value: string = "";

    constructor(){
        super();
        this.output("result", Type.String, null);
    }
}