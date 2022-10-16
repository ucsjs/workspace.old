import { Blueprint, Type } from "@ucsjs/blueprint";

export class IsSafeIntegerExpExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "IsSafeInteger";
    private __group = "Validation";
    private __headerColor = "#00706c";
    private __help = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger";

    constructor(){
        super();
        this.input("value", Type.Float, null);
        this.output("result", Type.Boolean, null);
    }
}