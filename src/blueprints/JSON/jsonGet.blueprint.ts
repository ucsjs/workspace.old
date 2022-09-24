import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";

export class JSONGetBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Get";
    private __group = "JSON";
    private __module = true;
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("JSON", Type.JSON, null).subscribe((json) => {
            if(json){
                if(json.hasOwnProperty(this._key)){
                    const json = {};
                    json[this._key] = json[this._key];
                    this.next("result", json);
                }
            }
        });

        this.output("result", Type.JSON, null);
    }
}