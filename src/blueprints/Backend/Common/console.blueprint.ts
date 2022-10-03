import { Blueprint, Type } from "@ucsjs/blueprint";

export class ConsoleBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Console";
    private __group = "Common";
    private __help = "https://www.w3schools.com/jsref/met_console_log.asp";

    constructor(){
        super();
        this.input("message", Type.String, null, (v) => (v) ? console.log(v) : null);
    }
}