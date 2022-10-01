import { Blueprint, Type } from "@ucsjs/blueprint";

export class LocalStorageSetItemClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Set Item";
    private __group = "LocalStorage";
    private __headerColor = "#3d5e01";
    private __headerIcon = "fa-solid fa-table-list";

    public _key: string = "";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.String, null);
    }
}