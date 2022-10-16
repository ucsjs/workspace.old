import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToPrecisionExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toPrecision";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-shuffle";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision";
 
    public _precision: number = 1;

    constructor(){
        super();
        this.input("value", Type.Float, null);
        this.output("result", Type.Float, null);
    }
}