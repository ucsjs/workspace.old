import { Blueprint } from "@ucsjs/blueprint";

export class RedirectClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Redirect";
    private __group = "Action";
    private __headerIcon = "fa-solid fa-arrows-split-up-and-left";
    private __trigger = true;

    public _url: string = "";
}