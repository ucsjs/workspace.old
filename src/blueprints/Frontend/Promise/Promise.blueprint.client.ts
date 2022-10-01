import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { TypePromise } from "./PromiseTypes.enum";

export class PromiseClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Promise";
    private __group = "Promise";
    private __headerColor = "#0097c9";
    private __headerIcon = "fa-solid fa-gears";
    private __TypePromise_Function: object = { color: "#abf760" };
    private __TypePromise_Promise: object = { color: "#005f7c" };
 
    constructor(metadata?: any){
        super();
        this.input("callback", TypePromise.Function, null);
        this.output("promise", TypePromise.Promise, null);
    }
}