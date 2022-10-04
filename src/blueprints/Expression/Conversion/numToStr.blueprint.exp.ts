import { Blueprint, Type } from "@ucsjs/blueprint";

export class NumToStrExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Num To Str";
    private __group = "Converter";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-shuffle";

    constructor(){
        super();
        this.input("number", Type.Float, null);
        this.output("result", Type.String, null);
    }
}