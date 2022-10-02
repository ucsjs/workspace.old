import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPParamBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Param";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-list-check";
    private __HTTPTypes_Request: object = { color: "yellow" };
    private __help = "https://docs.nestjs.com/controllers#route-parameters";

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
                        Logger.log(`Recive request: ${JSON.stringify(json)}`, "HTTPParamBlueprint");
                        this.next("result", json);
                    }
                    else{
                        Logger.log(`Recive request: ${request.params[this._name]}`, "HTTPParamBlueprint");
                        this.next("result", request.params[this._name]);
                    }
                }
                else{
                    Logger.log(`Recive request but dont has '${this._name}' param`, "HTTPParamBlueprint");
                }
            }
        });

        this.output("result", Type.Any, null);
    }
}