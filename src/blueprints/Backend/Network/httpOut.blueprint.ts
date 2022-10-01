import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPOutBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Out";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-turn-up";
    private __HTTPTypes_Request: object = { color: "yellow" };
    private __help = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status";

    private state: any = { contents: null, request: null };

    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null, (v) => {
            //Logger.log(`Recive Request`, "HTTPOutBlueprint");
            this.changeState(v, "request", this);
        });

        this.input("contents", Type.Any, null, (v) => {
            //Logger.log(`Recive Contents: ${JSON.stringify(v)}`, "HTTPOutBlueprint");
            this.changeState(v, "contents", this);
        });

        this.output("output", Type.Any, null);
    }

    changeState(v, name, scope){
        if(v && name)
            scope.state[name] = v;

        if(scope.state.request !== null && scope.state.contents !== null)
            scope.next("output", scope.state.contents);
    }
}