import { Blueprint, Type } from "@ucsjs/blueprint";

export class RecaptchaV3InitClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Recaptcha V3 Init";
    private __group = "Google";
    private __headerIcon = "fa-solid fa-shield-halved";
    private __headerColor = "#1A73E8";
    private __action = ["homepage", "login", "social", "e-commerce"];
    
    public _siteKey: string = "";
    public _action: string = "login";

    constructor(metadata?: any){
        super();
        this.output("token", Type.String, null);
    }
}