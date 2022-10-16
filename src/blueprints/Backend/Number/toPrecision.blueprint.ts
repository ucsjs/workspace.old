import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToPrecisionBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toPrecision";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision";
 
    public _precision: number = 1;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.Float, null, (v: number) => this.next("result", v.toPrecision(this._precision)));
        this.output("result", Type.String, null);
    }
}