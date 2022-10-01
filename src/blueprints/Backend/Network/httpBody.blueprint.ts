import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPBodyBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Body";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-list";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages";
    private __HTTPTypes_Request: object = { color: "yellow" };
 
    constructor(metadata?: any){
        super();

        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null).subscribe((request: Request) => {
            if(request && request.body)
                this.next("result", request.body)
        });

        this.output("result", Type.JSON, null);
    }
}