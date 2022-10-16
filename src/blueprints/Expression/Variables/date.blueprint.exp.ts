import { Blueprint, Type } from "@ucsjs/blueprint";

export class DateExpBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Date";
    private __group = "Variables";
    private __headerIcon = "fa-solid fa-pen";
    private __headerColor = "#8c0000";

    public _value: string = "";

    constructor(){
        super();
        this.output("result", Type.Date, null);
    }
}