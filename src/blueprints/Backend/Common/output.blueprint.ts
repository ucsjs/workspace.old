import { Blueprint, Type } from "@ucsjs/blueprint";

export class OutputBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Output";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-upload";

    public _name: string = "";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.input("input", Type.Any, null);
    }
}