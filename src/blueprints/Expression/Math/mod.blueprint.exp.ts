import { Blueprint, Type } from "@ucsjs/blueprint";

export class ModExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Mod";
    private __group = "Math";
    private __headerIcon = "fa-solid fa-divide";

    constructor(){
        super();
        this.input("num1", Type.Float, null);
        this.input("num2", Type.Float, null);
        this.output("result", Type.Float, null);
    }
}