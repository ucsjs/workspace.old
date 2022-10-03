import { Blueprint, Type } from "@ucsjs/blueprint";

export class LocalStorageRemoveItemClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Remove Item";
    private __group = "LocalStorage";
    private __headerColor = "#3d5e01";
    private __headerIcon = "fa-solid fa-table-list";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.event("done");
    }
}