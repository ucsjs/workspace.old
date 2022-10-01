import { Blueprint, Type } from "@ucsjs/blueprint";

export class SetCookieClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Set Cookie";
    private __group = "Cookie";
    private __headerColor = "#5e5a32";
    private __headerIcon = "fa-solid fa-cookie";
    private __sameSite = ["Strict", "Lax", "None"];

    public _key: string = "";
    public _expires: number = 0;
    public _maxAge: number = 0;
    public _domain: string = "";
    public _path: string = "/";
    public _secure: boolean = false;
    public _httpOnly: boolean = false;
    public _sameSite: string = "Strict";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.String, null);
    }
}