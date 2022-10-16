import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToStringBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toString";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toString";

    constructor(){
        super();
        this.input("value", Type.Float, null, (v: number) => this.next("result", v.toString()));
        this.output("result", Type.String, null);
    }
}