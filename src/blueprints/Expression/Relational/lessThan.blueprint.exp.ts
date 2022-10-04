import { Blueprint, Type } from "@ucsjs/blueprint";

export class LessThanExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Less Than";
    private __group = "Relational";
    private __headerIcon = "fa-solid fa-less-than";
    private __headerColor = "#6aad00";

    constructor(){
        super();
        this.input("elem1", Type.Float, null);
        this.input("elem2", Type.Float, null);
        this.output("result", Type.Boolean, null);
    }
}