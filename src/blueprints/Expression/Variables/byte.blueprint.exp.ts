import { Blueprint, Type } from "@ucsjs/blueprint";

export class ByteExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Byte";
    private __group = "Variables";
    private __headerIcon = "fa-solid fa-pen";
    private __headerColor = "#8c0000";

    public _value: number = 0x0;

    constructor(){
        super();
        this.output("result", Type.Byte, null);
    }
}