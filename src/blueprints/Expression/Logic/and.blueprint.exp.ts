import { Blueprint, Type } from "@ucsjs/blueprint";

export class AndExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "And";
    private __group = "Logic";
    private __headerIcon = "fa-solid fa-code-merge";
    private __headerColor = "#40006b";

    constructor(){
        super();
        this.input("expr1", Type.Any, null);
        this.input("expr2", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}