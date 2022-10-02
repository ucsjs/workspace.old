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

    private state: any = { contents: null, request: null, dispatched: false };

    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null, (request) => {
            if(request){
                Logger.log(`Recive request`, "HTTPOutBlueprint");
                this.changeState(request, "request", this);
            }           
        });

        this.input("contents", Type.Any, null, (contents) => {
            if(contents){
                Logger.log(`Recive Contents: ${JSON.stringify(contents)}`, "HTTPOutBlueprint");
                this.changeState(contents, "contents", this);
            }         
        });

        this.output("output", Type.Any, null);
    }

    changeState(v, name, scope){
        if(v && name)
            scope.state[name] = v;

        if(scope.state.request !== null && !scope.dispatched && scope.state.contents !== null){
            scope.dispatched = true;
            Logger.log(`Send Response`, "HTTPOutBlueprint");
            scope.state.request.res.status(200).send(scope.state.contents);
            scope.next("output", scope.state.contents);
        }       
        else {
            Logger.log(`Waiting for Request`, "HTTPOutBlueprint");
        }     
    }
}