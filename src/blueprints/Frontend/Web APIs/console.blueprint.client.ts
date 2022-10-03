/**
 * Console Blueprint
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class ConsoleClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Console";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-bug";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Console_API";
 
    constructor(metadata?: any){
        super();
        this.input("value", Type.Any, null);
    }
}