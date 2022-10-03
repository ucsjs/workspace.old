import { Blueprint, Type } from "@ucsjs/blueprint";

export class LocalStorageGetItemClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Get Item";
    private __group = "LocalStorage";
    private __headerColor = "#3d5e01";
    private __headerIcon = "fa-solid fa-table-list";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("value", Type.String, null);
    }
}