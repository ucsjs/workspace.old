import { Blueprint, Type } from "@ucsjs/blueprint";

export class GreaterThanExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Greater Than";
    private __group = "Relational";
    private __headerIcon = "fa-solid fa-greater-than";
    private __headerColor = "#6aad00";

    constructor(){
        super();
        this.input("elem1", Type.Float, null);
        this.input("elem2", Type.Float, null);
        this.output("result", Type.Boolean, null);
    }
}