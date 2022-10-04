import { Blueprint, Type } from "@ucsjs/blueprint";

export class PercExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Percentage";
    private __group = "Math";
    private __headerIcon = "fa-solid fa-percent";

    constructor(){
        super();
        this.input("num1", Type.Float, null);
        this.input("num2", Type.Float, null);
        this.output("percent", Type.Float, null);
    }
}