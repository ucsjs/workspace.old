import { Blueprint, Type } from "@ucsjs/blueprint";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPOutBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Out";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-turn-up";
    private __HTTPTypes_Request: object = { color: "yellow" };

    private state: any = {};

    constructor(metadata?: any){
        super();
        
        this.setup(metadata);
        this.input("request", HTTPTypes.Request, null, (v) => {
            this.changeState(v, "request", this)
        });
        this.input("contents", Type.Any, null, (v) => this.changeState(v, "contents", this));
    }

    changeState(v, name, scope){
        if(v && name)
            scope.state[name] = v;

        if(scope.state.request && scope.state.contents)
            scope.next("output", scope.state.contents);
    }
}