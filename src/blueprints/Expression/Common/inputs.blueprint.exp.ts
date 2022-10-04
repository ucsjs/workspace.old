import { Blueprint, Type } from "@ucsjs/blueprint";

export class InputsExpBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Inputs";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-download";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.output("inputs", Type.JSON, null);
    }
}