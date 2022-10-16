import { Blueprint, Type } from "@ucsjs/blueprint";

export class LastIndexOfBlueprint extends Blueprint{
    //Metadata
    private __namespace = "lastIndexOf";
    private __group = "String";
    private __headerColor = "#007393";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf";

    public _searchString: string = "";
    public _position: number = 0;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.String, null, (v: string) => this.next("result", v.lastIndexOf(this._searchString, this._position)));
        this.output("result", Type.Int, null);
    }
}