import { Blueprint, Type } from "@ucsjs/blueprint";

export class ElvExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Elv";
    private __group = "Math";
    private __headerIcon = "fa-solid fa-superscript";

    constructor(){
        super();
        this.input("num1", Type.Float, null);
        this.input("potency", Type.Float, null);
        this.output("result", Type.Float, null);
    }
}