import { Blueprint, Type } from "@ucsjs/blueprint";

export class NotExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Not";
    private __group = "Logic";
    private __headerIcon = "fa-solid fa-exclamation";
    private __headerColor = "#40006b";

    constructor(){
        super();
        this.input("expr1", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}