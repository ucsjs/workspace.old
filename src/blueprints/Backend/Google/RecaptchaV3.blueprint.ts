import axios from "axios";
import { Blueprint, Type } from "@ucsjs/blueprint";

export class RecaptchaV3Blueprint extends Blueprint{
    //Metadata
    private __namespace = "Recaptcha V3";
    private __group = "Google";
    private __headerColor = "#1A73E8";
    private __headerIcon = "./public/icons/recaptcha.png";
    private __help = "https://www.google.com/recaptcha/about/";

    public _siteKey: string = "";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("valid");

        this.input("token", Type.String, null, async (token) => {
            const result = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${this._siteKey}&response=${token}`)
            
            if(result.status === 200){
                if(result && result.data && result.data.success){
                    this.next("valid", true);
                    this.trigger("valid");
                }                    
                else 
                    this.next("error", "Invalid recaptcha token");
            }
            else{
                this.next("error", "Invalid recaptcha token");
            }
        });

        this.output("valid", Type.Boolean, null);   
        this.output("error", Type.String, null);       
    }
}