import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPOutBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Out";
    private __group = "Network";

    private state: any = {};

    constructor(metadata?: any){
        super();
        
        this.setup(metadata);
        this.input("request", HTTPTypes.Request, null, (v: Request) => this.changeState(v, "request", this));
        this.input("contents", Type.Any, null, (v) => this.changeState(v, "contents", this));
        this.output("output", Type.Any, null);
    }

    changeState(v, name, scope){
        scope.state[name] = v;

        if(scope.state.request && scope.state.contents)
            scope.next("output", scope.state.contents);
    }
}