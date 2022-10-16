import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToFixedExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toFixed";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-shuffle";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed";
 
    public _digits: number = 1;

    constructor(){
        super();
        this.input("value", Type.Float, null);
        this.output("result", Type.String, null);
    }
}