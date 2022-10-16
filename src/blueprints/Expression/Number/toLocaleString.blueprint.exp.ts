import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToLocaleStringExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toLocaleString";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-shuffle";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString";
    private __style = ["decimal", "currency", "percent"];
    private __currencyDisplay = ["symbol", "code", "name"];

    public _locale: string = "en-US";
    public _localeMatcher: string = "best fit";
    public _style: string = "decimal";
    public _currency: string = "USD";
    public _currencyDisplay: string = "symbol";
    public _useGrouping: boolean = true;

    constructor(){
        super();
        this.input("value", Type.Int, null);
        this.output("result", Type.String, null);
    }
}