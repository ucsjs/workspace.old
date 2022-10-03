import { Blueprint, Type } from "@ucsjs/blueprint";
import { IconType } from "../../Types/Icon.type";

export class NotificationVisualClientBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Notification";
    private __group = "Visual Objects";
    private __headerIcon = "fa-solid fa-circle-exclamation";
    private __headerColor = "#630000";
    private __type = ["info", "success", "warning", "error"];
    private __trigger = true;
    private __componentLink = "NotificationVisual";

    private _icon: IconType;
    public _name: string = "";
    public _type: string = "info";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("message", Type.String, null);
    }
}