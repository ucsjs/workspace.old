import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPParamBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Param";
    private __group = "Network";
    private __module = true;
    private __headerIcon = "fa-solid fa-list-check";
    private __HTTPTypes_Request: object = { color: "yellow" };

    public _name: string = "";
    public _toJSON: boolean = false;
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null).subscribe((request) => {
            if(request){
                Logger.log(`Recive connection, check param exists ${this._name} : ${request.params.hasOwnProperty(this._name)}`, "HTTPParamBlueprint");

                if(request.params.hasOwnProperty(this._name)){
                    if(this._toJSON){
                        const json = {};
                        json[this._name] = request.params[this._name];
                        this.next("result", json);
                    }
                    else{
                        this.next("result", request.params[this._name]);
                    }
                }
            }
        });

        this.output("result", Type.Any, null);
    }
}