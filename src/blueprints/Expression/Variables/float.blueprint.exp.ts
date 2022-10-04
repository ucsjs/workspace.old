import { Blueprint, Type } from "@ucsjs/blueprint";

export class FloatExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Float";
    private __group = "Variables";
    private __headerIcon = "fa-solid fa-pen";
    private __headerColor = "#8c0000";

    public _value: number = 0;

    constructor(){
        super();
        this.output("result", Type.Float, null);
    }
}