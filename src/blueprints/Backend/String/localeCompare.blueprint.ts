import { Blueprint, Type } from "@ucsjs/blueprint";

export class LocaleCompareBlueprint extends Blueprint{
    //Metadata
    private __namespace = "localeCompare";
    private __group = "String";
    private __headerColor = "#007393";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare";

    public _locales: string = "en";

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("str1", Type.String, null, (v) => this.parse(v, "str1", this));
        this.input("str2", Type.String, null, (v) => this.parse(v, "str2", this));
        this.output("result", Type.Int, null);
    }

    parse(v, name, scope){
        scope.strs[name] = v;
        
        if(scope.strs.num1 && scope.strs.num2){
            const result = scope.strs.str1.localeCompare(scope.strs.str2, scope._locales);
            scope.next("result", result);
        }
    }
}