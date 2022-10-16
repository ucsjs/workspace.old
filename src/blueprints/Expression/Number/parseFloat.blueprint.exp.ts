import { Blueprint, Type } from "@ucsjs/blueprint";

export class ParseFloatExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "parseFloat";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-shuffle";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat";

    constructor(){
        super();
        this.input("value", Type.Any, null);
        this.output("result", Type.Float, null);
    }
}