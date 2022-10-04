import { Blueprint, Type } from "@ucsjs/blueprint";

export class StrToNumBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Str To Int";
    private __group = "Converter";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-shuffle";

    constructor(){
        super();
        this.input("value", Type.String, null);
        this.output("result", Type.Float, null);
    }
}