import { Blueprint, Type } from "@ucsjs/blueprint";

export class GetValueExpBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Get Value";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-hand-pointer";

    public _key: string = "";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.input("inputs", Type.JSON, null);
        this.output("value", Type.Any, null);
    }
}