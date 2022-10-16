import { Blueprint, Type } from "@ucsjs/blueprint";

export class ToLocaleStringBlueprint extends Blueprint{
    //Metadata
    private __namespace = "toLocaleString";
    private __group = "Number";
    private __headerColor = "#777f00";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString";
    private __style = ["decimal", "currency", "percent"];
    private __currencyDisplay = ["symbol", "code", "name"];

    public _locale: string = "en-US";
    public _localeMatcher: string = "best fit";
    public _style: string = "decimal";
    public _currency: string = "USD";
    public _currencyDisplay: string = "symbol";
    public _useGrouping: boolean = true;

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        let options = {};

        if(this._localeMatcher)
            options["localeMatcher"] = this._localeMatcher || "best fit";

        if(this._style)
            options["style"] = this._style || "decimal";

        if(this._currency)
            options["currency"] = this._currency;

        if(this._currencyDisplay)
            options["currencyDisplay"] = this._currencyDisplay || "symbol";

        if(this._useGrouping)
            options["useGrouping"] = this._useGrouping || true;

        this.input("value", Type.Float, null, (v: number) => this.next("result", v.toLocaleString(this._locale, options)));
        this.output("result", Type.String, null);
    }
}