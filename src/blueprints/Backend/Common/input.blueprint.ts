import { Blueprint, Type } from "@ucsjs/blueprint";

export class InputBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Input";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-download";

    public _input: string = "";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.output("output", Type.Any, null);
    }
}