import { Blueprint, Type } from "@ucsjs/blueprint";

export class LocalStorageClearClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Clear";
    private __group = "LocalStorage";
    private __headerColor = "#3d5e01";
    private __headerIcon = "fa-solid fa-table-list";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear";
    private __trigger = true;
}