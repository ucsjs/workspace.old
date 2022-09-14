import { Blueprint, Type } from "@ucsjs/blueprint";

export class OutputBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Output";
    private __group = "Common";

    constructor(){
        super();
        this.input("output", Type.Any, null);
    }
}