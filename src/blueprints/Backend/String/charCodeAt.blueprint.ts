import { Blueprint, Type } from "@ucsjs/blueprint";

export class CharCodeAtBlueprint extends Blueprint{
    //Metadata
    private __namespace = "charCodeAt";
    private __group = "String";
    private __headerColor = "#007393";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt";

    public _index: number = 0;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.String, null, (v: string) => this.next("result", v.charCodeAt(this._index)));
        this.output("result", Type.Int, null);
    }
}