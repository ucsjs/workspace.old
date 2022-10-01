import { Blueprint, Type } from "@ucsjs/blueprint";

export class GetCookieClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Get Cookie";
    private __group = "Cookie";
    private __headerColor = "#5e5a32";
    private __headerIcon = "fa-solid fa-cookie";
    private __help = "https://www.w3schools.com/js/js_cookies.asp";

    public _key: string = "";
    public _returnJSON: boolean = false;
 
    constructor(metadata?: any){
        super();
        this.output("value", Type.Any, null);
    }
}