import { Blueprint, Type } from "@ucsjs/blueprint";

export class ConcatBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Concat";
    private __group = "String";
    private __headerColor = "#007393";
    private __headerIcon = "fa-solid fa-cogs";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/concat";
    private strs: any = {};

    constructor(){
        super();
        this.input("str1", Type.String, null, (v) => this.parse(v, "str1", this));
        this.input("str2", Type.String, null, (v) => this.parse(v, "str2", this));
        this.output("result", Type.String, null);
    }

    parse(v, name, scope){
        scope.strs[name] = v;
        
        if(scope.strs.num1 && scope.strs.num2){
            const result = scope.strs.str1.concat(scope.strs.str2);
            scope.next("result", result);
        }
    }
}