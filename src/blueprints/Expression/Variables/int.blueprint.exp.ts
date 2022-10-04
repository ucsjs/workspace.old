import { Blueprint, Type } from "@ucsjs/blueprint";

export class IntExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Int";
    private __group = "Variables";
    private __headerIcon = "fa-solid fa-pen";
    private __headerColor = "#8c0000";

    public _value: number = 0;

    constructor(){
        super();
        this.output("result", Type.Int, null);
    }
}