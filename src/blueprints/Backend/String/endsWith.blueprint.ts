import { Blueprint, Type } from "@ucsjs/blueprint";

export class EndsWithBlueprint extends Blueprint{
    //Metadata
    private __namespace = "endsWith";
    private __group = "String";
    private __headerColor = "#007393";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith";

    public _searchString: string = "";
    public _endPosition: number = 0;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.String, null, (v: string) => this.next("result", v.endsWith(this._searchString, this._endPosition)));
        this.output("result", Type.Boolean, null);
    }
}