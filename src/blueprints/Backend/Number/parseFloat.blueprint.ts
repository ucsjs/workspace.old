import { Blueprint, Type } from "@ucsjs/blueprint";

export class ParseFloatBlueprint extends Blueprint{
    //Metadata
    private __namespace = "parseFloat";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat";

    constructor(){
        super();
        this.input("value", Type.Float, null, (v) => this.next("result", parseFloat(v)));
        this.output("result", Type.Float, null);
    }
}