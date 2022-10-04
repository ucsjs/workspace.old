import { Blueprint, Type } from "@ucsjs/blueprint";

export class OrExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Or";
    private __group = "Logic";
    private __headerIcon = "fa-solid fa-code-fork";
    private __headerColor = "#40006b";

    constructor(){
        super();
        this.input("expr1", Type.Any, null);
        this.input("expr2", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}