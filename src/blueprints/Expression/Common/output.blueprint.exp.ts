import { Blueprint, Type } from "@ucsjs/blueprint";

export class OutputExpBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Output";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-upload";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.input("input", Type.Boolean, null);
    }
}