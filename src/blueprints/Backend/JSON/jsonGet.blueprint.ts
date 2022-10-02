import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";

export class JSONGetBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Get";
    private __group = "JSON";
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("JSON", Type.JSON, null).subscribe((json) => {
            if(json){
                if(typeof json === "object" && json[this._key])
                    this.next("result", json[this._key]);
                else
                    Logger.log(`Recive JSON but dont has '${this._key}' key`, "JSONGetBlueprint");
            }            
        });

        this.output("result", Type.Any, null);
    }
}