import { Blueprint, Type } from "@ucsjs/blueprint";

export class HTTPRequestClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Request";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-cloud-arrow-up";
    private __trigger = true;
    private __method = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    private __cache = ["default", "reload", "no-cache"];
    private __credentials = ["omit", "same-origin", "include"];
    private __mode = ["cors", "no-cors", "same-origin", "navigate"];
    private __priority = ["auto", "high", "low"];
    private __redirect = ["follow", "error", "manual"];
  
    public _name: string = "";
    public _url: string = "";
    public _method: string = "GET";
    public _cache: string = "default";
    public _credentials: string = "omit";
    public _mode: string = "cors";
    public _priority: string = "auto";
    public _redirect: string = "follow";
    public _referrer: string = "";
    public _referrerPolicy: string = "no-referrer";
    public _keepalive: boolean = false;
    public _headers: object = {headerKey: "string", value: "string", multi: true}; 
 
    constructor(metadata?: any){
        super();

        this.event("success");

        this.input("body", Type.JSON, null);

        this.output("result", Type.Any, null);
        this.output("error", Type.Any, null);
    }
}