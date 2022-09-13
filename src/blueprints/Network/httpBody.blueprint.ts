import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPBodyBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Body";
    private __type = "Network";
    private __module = true;
    private __HTTPTypes_Request: object = { color: "yellow" };
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("request", HTTPTypes.Request, null).subscribe((request: Request) => this.next("result", request.body));
        this.output("result", Type.JSON, null);
    }
}