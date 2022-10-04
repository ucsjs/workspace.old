import { Blueprint, Type } from "@ucsjs/blueprint";

export class RightShiftExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Right Shift";
    private __group = "Bits";
    private __headerIcon = "fa-solid fa-code-compare";
    private __headerColor = "#d35400";

    constructor(){
        super();
        this.input("expr1", Type.Int, null);
        this.input("expr2", Type.Int, null);
        this.output("result", Type.Int, null);
    }
}