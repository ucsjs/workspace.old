import { Blueprint, Type } from "@ucsjs/blueprint";

export class NotEqualExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Not Equal";
    private __group = "Relational";
    private __headerIcon = "fa-solid fa-not-equal";
    private __headerColor = "#6aad00";

    constructor(){
        super();
        this.input("elem1", Type.Any, null);
        this.input("elem2", Type.Any, null);
        this.output("result", Type.Boolean, null);
    }
}