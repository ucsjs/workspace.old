/**
 * Fetch API Blueprint
 * 
 * The Fetch API provides an interface for fetching resources (including across the network). 
 * It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a 
 * more powerful and flexible feature set.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class FetchClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Fetch";
    private __group = "Web APIs";
    private __headerColor = "#332946";
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