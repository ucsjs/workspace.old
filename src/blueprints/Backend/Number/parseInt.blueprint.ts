import { Blueprint, Type } from "@ucsjs/blueprint";

export class ParseIntBlueprint extends Blueprint{
    //Metadata
    private __namespace = "parseInt";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt";

    constructor(){
        super();
        this.input("value", Type.Float, null, (v) => this.next("result", parseInt(v)));
        this.output("result", Type.Float, null);
    }
}