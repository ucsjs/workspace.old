import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { Request } from "express";

export class JSONItemBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Item";
    private __group = "JSON";
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("value", Type.Any, null).subscribe((value) => {
            let tmpJson = {};
            tmpJson[this._key] = value;
            this.next("result", tmpJson);
        });

        this.output("result", Type.JSON, null);
    }
}