import { Blueprint, Type } from "@ucsjs/blueprint";

export class OutputBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Output";
    private __type = "Common";

    constructor(){
        super();
        this.input("output", Type.Any, null);
    }
}