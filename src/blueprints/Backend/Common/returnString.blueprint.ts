import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";

export class ReturnStringBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Return String";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-upload";
    private __trigger = true;

    public _value: string = "";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.output("string", Type.Any, null);
    }

    trigger() {
        Logger.log(`Triggered`, "ReturnStringBlueprint");
        this.next("string", this._value);
    }
}