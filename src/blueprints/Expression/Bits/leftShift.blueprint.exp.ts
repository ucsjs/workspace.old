import { Blueprint, Type } from "@ucsjs/blueprint";

export class LeftShiftExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Left Shift";
    private __group = "Bits";
    private __headerIcon = "fa-solid fa-code-compare";
    private __headerColor = "#d35400";

    constructor(){
        super();
        this.input("expr1", Type.Byte, null);
        this.input("expr2", Type.Byte, null);
        this.output("result", Type.Byte, null);
    }
}