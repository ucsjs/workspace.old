import { Blueprint, Type } from "@ucsjs/blueprint";

export class MulExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Mul";
    private __group = "Math";
    private __headerIcon = "fa-solid fa-xmark";

    constructor(){
        super();
        this.input("num1", Type.Float, null);
        this.input("num2", Type.Float, null);
        this.output("result", Type.Float, null);
    }
}