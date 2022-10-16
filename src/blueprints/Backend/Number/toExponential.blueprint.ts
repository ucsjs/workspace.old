import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToExponentialBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toExponential";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential";
 
    public _fractionDigits: number = 1;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.Float, null, (v: number) => this.next("result", v.toExponential(this._fractionDigits)));
        this.output("result", Type.Float, null);
    }
}