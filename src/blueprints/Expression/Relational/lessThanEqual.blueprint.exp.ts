import { Blueprint, Type } from "@ucsjs/blueprint";

export class LessThanEqualExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Less Than Equal";
    private __group = "Relational";
    private __headerIcon = "fa-solid fa-less-than-equal";
    private __headerColor = "#6aad00";

    constructor(){
        super();
        this.input("elem1", Type.Float, null);
        this.input("elem2", Type.Float, null);
        this.output("result", Type.Boolean, null);
    }
}