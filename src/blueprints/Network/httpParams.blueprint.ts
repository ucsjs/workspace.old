import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPParamsBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Params";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-list-ul";
    private __HTTPTypes_Request: object = { color: "yellow" };
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null).subscribe((request) => {
            if(request)
                this.next("result", request.params);
        });

        this.output("params", Type.JSON, null);
    }
}