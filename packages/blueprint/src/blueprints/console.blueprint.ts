import { Type } from "../enums/types.enum";
import { Blueprint, Global } from "../services";

export class ConsoleBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Console";
    private __group = "Common";
    private __private = true;

    constructor(){
        super();
        this.input("message", Type.String, null, (v) => (v) ? console.log(v) : null);
    }
}

Global.register(ConsoleBlueprint);