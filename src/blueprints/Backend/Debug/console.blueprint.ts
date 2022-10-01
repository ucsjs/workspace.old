import { Blueprint, Type } from "@ucsjs/blueprint";

export class ConsoleBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Console";
    private __group = "Debug";

    constructor(){
        super();
        this.input("message", Type.String, null, (v) => (v) ? console.log(v) : null);
    }
}